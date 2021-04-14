import { Module } from '@nestjs/common';
import { HomeController } from './controller/home';
import { ViteServiceModule } from '../vite-service';

@Module({
  imports: [ViteServiceModule],
  controllers: [HomeController],
  providers: [],
})
export class SetupModule {}
