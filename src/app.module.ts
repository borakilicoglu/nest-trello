import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api.module';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { DateScalar } from './shared/date.scalar';
import { DatabaseConfigFactory } from './db-config.factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigFactory,
      // todo: add schema validation: https://docs.nestjs.com/techniques/configuration#schema-validation
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      introspection: true,
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [DateScalar, AppGateway],
})
export class AppModule {}
