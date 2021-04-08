import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const fastify = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify,
  );

  await app.listen(7001);
}

bootstrap();
