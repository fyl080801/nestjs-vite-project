import { Module } from '@nestjs/common';
import { HomeController } from './controller/home';
import { CustomController } from './controller/custom';
import { AppService } from './service/app';

import { ViteServiceModule } from '../viteService';

@Module({
  imports: [ViteServiceModule],
  controllers: [CustomController, HomeController],
  providers: [AppService],
})
export class AppModule {}
