import 'reflect-metadata';
import { createKoaServer, KoaMiddlewareInterface, Middleware, useContainer } from 'routing-controllers';

@Middleware({type: 'before'})
class ExampleMiddleware implements KoaMiddlewareInterface { // interface implementation is optional

    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        console.log('do something before execution...');
        return next().then(() => {
            console.log('do something after execution');
        }).catch(error => {
            console.log('error handling is also here');
        });
    }

}

/**********************************************************/
//  Proof: routing-controllers fails when a middleware is defined but is not be registered in container
/**********************************************************/
describe('rooting-controllers-global-middleware', () => {
    it('should work when the middleware is not registered', () => {
        const getter = <T>(someClass: { new(...args: any[]): T } | Function): T => {
            throw new Error(`Service not found for [${someClass}]`);
        };

        useContainer({get: getter});

        /* routing-controllers throws exception because it cannot retrieve the instance of `ExampleMiddleware`
         * from the container. This may be a bug because the middleware is not included in `RoutingControllersOptions.middlewares` */
        createKoaServer();
    });
    it('should work when the middleware is registered explicitly', () => {
        const getter = <T>(someClass: { new(...args: any[]): T } | Function): T => {
            if (someClass === ExampleMiddleware) return new ExampleMiddleware() as any as T;
            throw new Error(`Service not found for [${someClass}]`);
        };
        useContainer({get: getter});
        createKoaServer();
    });
});