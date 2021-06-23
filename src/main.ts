import { NestFactory } from '@nestjs/core';
import { MainModule } from './module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  process.setMaxListeners(0);

  const adapter = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    adapter,
  );

  await app.listen(3000);
}

bootstrap();
