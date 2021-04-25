import { Module, OnModuleInit } from '@nestjs/common';
import { HomeController } from './controller/home';
import { ViewConstantsService, ViteServiceModule } from '@seed/vite_service';
import * as path from 'path';

@Module({
  imports: [ViteServiceModule],
  controllers: [HomeController],
})
export class AdminLoginModule implements OnModuleInit {
  constructor(private readonly constants: ViewConstantsService) {}

  onModuleInit() {
    this.constants.setPath('app', path.resolve(__dirname, '../'));
  }
}
