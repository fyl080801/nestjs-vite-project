import { Module, OnModuleInit } from '@nestjs/common';
import { HomeController } from './controller/home';
import { AppController } from './controller/app';
import { StaticService, ViewServiceModule } from '@nestseed/view_service';

@Module({
  imports: [ViewServiceModule],
  controllers: [HomeController, AppController],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly staticService: StaticService) {}

  onModuleInit() {
    this.staticService.addStatic('app', __dirname);
  }
}
