"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var CustomContainer = /** @class */ (function () {
    function CustomContainer() {
    }
    CustomContainer.prototype.get = function (someClass) {
        throw new Error("No service for [" + someClass + "].");
    };
    return CustomContainer;
}());
/**********************************************************/
//  Proof: routing-controllers fails when a middleware is defined by not registered in container
/**********************************************************/
describe('rooting-controllers-issue-32', function () {
    it('fails when a middleware is defined by not registered in container', function () {
        var c = new CustomContainer();
        routing_controllers_1.useContainer(c);
        routing_controllers_1.createKoaServer();
    });
});
