import { Module, OnModuleInit } from '@nestjs/common';
import { HomeController } from './controller/home';
import { AppController } from './controller/app';
import { ViewConstantsService, ViteServiceModule } from '@seed/vite_service';
import * as path from 'path';

@Module({
  imports: [ViteServiceModule],
  controllers: [HomeController, AppController],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly constants: ViewConstantsService) {}

  onModuleInit() {
    this.constants.setPath('app', path.resolve(__dirname, '../'));
  }
}
