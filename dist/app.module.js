"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const api_module_1 = require("./api.module");
const app_controller_1 = require("./app.controller");
const app_gateway_1 = require("./app.gateway");
const date_scalar_1 = require("./shared/date.scalar");
const db_config_factory_1 = require("./db-config.factory");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: db_config_factory_1.DatabaseConfigFactory,
            }),
            graphql_1.GraphQLModule.forRoot({
                debug: true,
                playground: true,
                introspection: true,
                typePaths: ['./**/*.graphql'],
                context: ({ req }) => ({ headers: req.headers }),
            }),
            api_module_1.ApiModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [date_scalar_1.DateScalar, app_gateway_1.AppGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map