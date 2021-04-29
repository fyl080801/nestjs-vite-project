import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { ViewService } from './service/view';
import { StaticService } from './service/static';
import { ViteMiddleware } from './middleware/vite';
import { ENV, Environments } from '@nestseed/common';

export * from './decorators/view';

@Module({
  imports: [],
  controllers: [],
  providers: [ViewService, StaticService],
  exports: [ViewService, StaticService],
})
export class ViteServiceModule implements NestModule, OnModuleInit {
  constructor(private readonly view: ViewService) {}

  async onModuleInit() {
    if (ENV === Environments.development) {
      await this.view.bootstrap();
    }
  }

  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ViteMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}

export { ViewService, StaticService };
