import { NestFactory } from '@nestjs/core';
import { MainModule } from './module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  process.setMaxListeners(0);

  const app = await NestFactory.create(MainModule);

  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
