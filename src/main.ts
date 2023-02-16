import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT;
  const NODE_ENV = process.env.NODE_ENV;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);

  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}! 🚀`);
}
bootstrap();
