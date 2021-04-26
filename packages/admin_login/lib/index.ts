import { Module, OnModuleInit } from '@nestjs/common';
import { HomeController } from './controller/home';
import { ViewConstantsService, ViteServiceModule } from '@seed/vite_service';
import * as path from 'path';
// import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ViteServiceModule,
    // ServeStaticModule.forRoot({
    //   serveRoot: '/admin_login',
    //   serveStaticOptions: { fallthrough: false },
    //   rootPath: __dirname,
    // }),
  ],
  controllers: [HomeController],
})
export class AdminLoginModule implements OnModuleInit {
  constructor(private readonly constants: ViewConstantsService) {}

  onModuleInit() {
    this.constants.setPath('admin_login', path.resolve(__dirname, '../'));
  }
}
