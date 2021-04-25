import { Module, OnModuleInit } from '@nestjs/common';
import { HomeController } from './controller/home';
import { AppController } from './controller/app';
import { ViewConstantsService, ViteServiceModule } from '@seed/vite_service';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ViteServiceModule,
    ServeStaticModule.forRoot({
      serveRoot: '/app',
      rootPath: path.resolve(__dirname, '../ui'),
    }),
  ],
  controllers: [HomeController, AppController],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly constants: ViewConstantsService) {}

  onModuleInit() {
    this.constants.setPath('app', path.resolve(__dirname, '../'));
  }
}
