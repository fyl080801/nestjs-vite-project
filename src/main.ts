import { NestFactory } from '@nestjs/core';
import { MainModule } from './module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  process.setMaxListeners(0);

  const fastify = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    fastify,
  );

  await app.listen(3000);
}

bootstrap();
