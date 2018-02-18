"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var routing_controllers_1 = require("routing-controllers");
var ExampleMiddleware = /** @class */ (function () {
    function ExampleMiddleware() {
    }
    ExampleMiddleware.prototype.use = function (context, next) {
        console.log('do something before execution...');
        return next().then(function () {
            console.log('do something after execution');
        }).catch(function (error) {
            console.log('error handling is also here');
        });
    };
    ExampleMiddleware = __decorate([
        routing_controllers_1.Middleware({ type: 'before' })
    ], ExampleMiddleware);
    return ExampleMiddleware;
}());
/**********************************************************/
//  Proof: routing-controllers fails when a middleware is defined but is not be registered in container
/**********************************************************/
describe('rooting-controllers-global-middleware', function () {
    it('should work when the middleware is not registered', function () {
        var getter = function (someClass) {
            throw new Error("Service not found for [" + someClass + "]");
        };
        routing_controllers_1.useContainer({ get: getter });
        /* routing-controllers throws exception because it cannot retrieve the instance of `ExampleMiddleware`
         * from the container. This may be a bug because the middleware is not included in `RoutingControllersOptions.middlewares` */
        routing_controllers_1.createKoaServer();
    });
    it('should work when the middleware is registered explicitly', function () {
        var getter = function (someClass) {
            if (someClass === ExampleMiddleware)
                return new ExampleMiddleware();
            throw new Error("Service not found for [" + someClass + "]");
        };
        routing_controllers_1.useContainer({ get: getter });
        routing_controllers_1.createKoaServer();
    });
});
//# sourceMappingURL=global-middleware.test.js.map