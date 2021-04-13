import { Module } from '@nestjs/common';
import { HomeController } from './controller/home';
import { AppService } from './service/app';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

import { ViteServiceModule } from '../viteService';

@Module({
  imports: [
    ViteServiceModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, 'frontend'),
    // }),
  ],
  controllers: [HomeController],
  providers: [AppService],
})
export class AppModule {}
