import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { HomeController, AppController } from './controller';
import { StaticService, ViewServiceModule } from '@nestseed/view_service';
import { MembershipModule } from '@nestseed/membership';
import { DataAccessModule, ModelService } from '@nestseed/data_access';
import { Rule } from './models/rule';
import {
  AppsService,
  IndexRestfulHandler,
  ResourceRestfulHandler,
} from './service';
import { ModelRestful } from './middleware';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './types';

@Module({
  providers: [AppsService, IndexRestfulHandler, ResourceRestfulHandler],
  imports: [DataAccessModule, ViewServiceModule, MembershipModule],
  controllers: [HomeController, AppController],
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(
    private readonly staticService: StaticService,
    private readonly modelService: ModelService,
    private readonly appsService: AppsService,
    private readonly configService: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const config = this.configService.get<AppConfig>('app');

    consumer.apply(ModelRestful).forRoutes({
      path: `/${config?.openapiPrefix || 'openapi'}/(.*)`,
      method: RequestMethod.ALL,
    });
  }

  async onModuleInit() {
    // 这里的路径和 controller 的会冲突，因此要加上二级目录
    // 和 vite.config 里 assetsDir 定义的一致
    this.staticService.addStatic(__dirname, 'app/static');
    this.modelService.addModel(Rule);
    this.appsService.initModels();
  }
}
