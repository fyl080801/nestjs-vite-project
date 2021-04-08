import { Module } from '@nestjs/common';
import { HomeController } from './controller/home';
import { AppService } from './service/app';

import { ViteServiceModule } from '../viteService';

@Module({
  imports: [ViteServiceModule],
  controllers: [HomeController],
  providers: [AppService],
})
export class AppModule {}
