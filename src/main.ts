import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Nest Trello Api')
    .setDescription('The nest trello API description')
    .setVersion('1.0')
    .addTag('Nest Trello')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableShutdownHooks();

  const DEFAULT_CORS_URLS: string[] = [
    'https://borakilicoglu.github.io',
    'http://localhost:4200', // angular
    'http://localhost:3000', // react
    'http://localhost:8081', // react-native
  ];

  // user-defined frontend URL
  const frontendUrl = app
    .get<ConfigService>(ConfigService)
    .get('FRONTEND_BASE_URL');

  // dedupe URLs (in case frontendUrl is in the default list)
  const CORS_URLS = Array.from(
    new Set<string>([...DEFAULT_CORS_URLS, ...[frontendUrl]]),
  );

  app.enableCors({
    origin: CORS_URLS,
    credentials: true,
  });
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
