import { Module, OnModuleInit } from '@nestjs/common';
import { HomeController } from './controller/home';
import { StaticService, ViewServiceModule } from '@nestseed/view_service';
import { PassportModule } from '@nestseed/passport';

@Module({
  imports: [PassportModule, ViewServiceModule],
  controllers: [HomeController],
})
export class AdminLoginModule implements OnModuleInit {
  constructor(private readonly staticService: StaticService) {}

  onModuleInit() {
    this.staticService.addStatic(__dirname, 'admin_login/static');
  }
}
