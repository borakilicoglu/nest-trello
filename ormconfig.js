// require('dotenv').config();

// module.exports = {
//   name: 'default',
//   type: 'postgres',
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   synchronize: true,
//   dropSchema: false,
//   logging: true,
//   entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
// };

const env = require('dotenv');
env.config();

const isProd = process.env.NODE_ENV === 'production';
const entitiesExtension = isProd ? 'js' : 'ts';
const entitiesDir = isProd ? 'dist' : 'src';
const migrationsDir = isProd ? 'dist/migration/*.js' : 'src/migration/*.ts';

module.exports = {
  type: 'postgres',
  entities: [`${__dirname}/${entitiesDir}/**/*.entity.${entitiesExtension}`],
  url: process.env.DATABASE_URL,
  migrations: [migrationsDir],
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  cli: {
    migrationsDir: 'src/migration',
  },
};
