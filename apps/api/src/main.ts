import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const DEFAULT_PREFIX = 'api';
const GLOBAL_PREFIX = process.env.GLOBAL_PREFIX ?? DEFAULT_PREFIX;

const DEFAULT_PORT = 4001;
const PORT = process.env.PORT ?? DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });

  app.setGlobalPrefix(GLOBAL_PREFIX);

  await app.listen(PORT);

  Logger.log(`🚀 Application is running on port ${PORT}`, 'NestApplication');
}

void bootstrap();
