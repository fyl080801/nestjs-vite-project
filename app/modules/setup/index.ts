import { Module } from '@nestjs/common';
import { HomeController } from './controller/home';
import { ViteServiceModule } from '../viteService';

@Module({
  imports: [ViteServiceModule],
  controllers: [HomeController],
  providers: [],
})
export class SetupModule {}
