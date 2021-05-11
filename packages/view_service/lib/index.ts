import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  OnModuleDestroy,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { ViewService } from './service/view';
import { StaticService } from './service/static';
import { ViteMiddleware } from './middleware/vite';
import { ENV, Environments } from '@nestseed/common';

export * from './decorators/view';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ViewService,
    StaticService,
    { provide: 'constants', scope: Scope.DEFAULT, useValue: { server: null } },
  ],
  exports: [ViewService, StaticService],
})
export class ViewServiceModule
  implements NestModule, OnModuleInit, OnModuleDestroy
{
  constructor(private readonly view: ViewService) {}

  async onModuleInit() {
    if (ENV === Environments.development) {
      await this.view.bootstrap();
    }
  }

  async onModuleDestroy() {
    await this.view.destroy();
  }

  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ViteMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}

export { ViewService, StaticService };
