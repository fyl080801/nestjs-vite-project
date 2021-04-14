import { Module } from '@nestjs/common';
import { HomeController } from './controller/home';
import { AppController } from './controller/app';
import { AppService } from './service/app';
import { ViteServiceModule } from '../viteService';
import { SetupModule } from '../setup';

@Module({
  imports: [ViteServiceModule, SetupModule],
  controllers: [HomeController, AppController],
  providers: [AppService],
})
export class AppModule {}
