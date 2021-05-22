import { Module, OnModuleInit } from '@nestjs/common';
import { HomeController } from './controller/home';
import { AppController } from './controller/app';
import { StaticService, ViewServiceModule } from '@nestseed/view_service';
import { MembershipModule } from '@nestseed/membership';
import { DataAccessModule, ModelService } from '@nestseed/data_access';
import { MapAcl } from './models/mapAcl';

@Module({
  imports: [DataAccessModule, ViewServiceModule, MembershipModule],
  controllers: [HomeController, AppController],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly staticService: StaticService,
    private readonly modelService: ModelService,
  ) {}

  onModuleInit() {
    // 这里的路径和 controller 的会冲突，因此要加上二级目录
    // 和 vite.config 里 assetsDir 定义的一致
    this.staticService.addStatic(__dirname, 'app/static');
    this.modelService.addModel(MapAcl);
  }
}
