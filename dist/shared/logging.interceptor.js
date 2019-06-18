"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const operators_1 = require("rxjs/operators");
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, call$) {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        if (req) {
            const method = req.method;
            const url = req.url;
            return call$.pipe(operators_1.tap(() => common_1.Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name)));
        }
        else {
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const resolverName = ctx.constructorRef.name;
            const info = ctx.getInfo();
            return call$.pipe(operators_1.tap(() => common_1.Logger.log(`${info.parentType} "${info.fieldName}" ${Date.now() - now}ms`, resolverName)));
        }
    }
};
LoggingInterceptor = __decorate([
    common_1.Injectable()
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logging.interceptor.js.map