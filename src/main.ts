import { NestFactory } from '@nestjs/core';
import { MainModule } from './module';

async function bootstrap() {
  process.setMaxListeners(0);

  const app = await NestFactory.create(MainModule);

  await app.listen(3000);
}

bootstrap();
