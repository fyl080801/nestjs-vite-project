import { NestFactory } from '@nestjs/core';
import { MainModule } from './module';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
// import * as path from 'path';

async function bootstrap() {
  process.setMaxListeners(0);

  const fastify = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    fastify,
  );

  // app.useStaticAssets({
  //   root: path.resolve(__dirname, '../packages/app/dist/app'),
  //   prefix: '/app',
  //   decorateReply: false,
  // });

  // app.useStaticAssets({
  //   root: path.resolve(__dirname, '../packages/admin_login/dist/admin_login'),
  //   prefix: '/admin_login',
  //   decorateReply: false,
  // });

  await app.listen(3000);
}

bootstrap();
