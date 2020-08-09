"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfigFactory = void 0;
const common_1 = require("@nestjs/common");
const isProd = process.env.NODE_ENV === 'production';
const entitiesExtension = isProd ? 'js' : 'ts';
const entitiesDir = isProd ? 'dist' : 'src';
const migrationsDir = isProd ? 'dist/migration/*.js' : 'src/migration/*.ts';
const dbconfig = {
    name: 'default',
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: false,
    synchronize: true,
    autoLoadEntities: true,
    migrations: [migrationsDir],
    cli: {
        migrationsDir: 'src/migration',
    },
};
let DatabaseConfigFactory = class DatabaseConfigFactory {
    createTypeOrmOptions() {
        console.log('-- got Postgres username: ', process.env.DATABASE_USERNAME);
        return dbconfig;
    }
};
DatabaseConfigFactory = __decorate([
    common_1.Injectable()
], DatabaseConfigFactory);
exports.DatabaseConfigFactory = DatabaseConfigFactory;
//# sourceMappingURL=db-config.factory.js.map