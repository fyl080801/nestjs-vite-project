import { Module } from '@nestjs/common';
import { HomeController } from './controller/home';
import { AppController } from './controller/app';
import { ViteServiceModule } from '@seed/vite_service';

@Module({
  imports: [ViteServiceModule],
  controllers: [HomeController, AppController],
})
export class AppModule {}
