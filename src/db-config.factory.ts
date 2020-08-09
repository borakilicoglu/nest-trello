import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

const isProd = process.env.NODE_ENV === 'production';

const entitiesExtension = isProd ? 'js' : 'ts';
const entitiesDir = isProd ? 'dist' : 'src';
const migrationsDir = isProd ? 'dist/migration/*.js' : 'src/migration/*.ts';

/**
 * TypeORM DB config
 */
const dbconfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
  // entities: [`${__dirname}/${entitiesDir}/**/*.entity.${entitiesExtension}`],
  synchronize: true,
  autoLoadEntities: true,
  migrations: [migrationsDir],
  cli: {
    migrationsDir: 'src/migration',
  },
};

/**
 * Make config for typeorm
 */
@Injectable()
export class DatabaseConfigFactory implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('-- got Postgres username: ', process.env.DATABASE_USERNAME);
    return dbconfig;
  }
}
