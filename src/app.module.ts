import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api.module';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { DateScalar } from './shared/date.scalar';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
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
