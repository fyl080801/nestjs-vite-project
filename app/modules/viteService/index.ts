import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ViteService } from './service/vite';
import { ViteMiddleware } from './middleware/vite';

@Module({
  imports: [],
  controllers: [],
  providers: [ViteService],
  exports: [ViteService],
})
export class ViteServiceModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ViteMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}

export { ViteService };
