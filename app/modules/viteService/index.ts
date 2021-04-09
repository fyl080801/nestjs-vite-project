import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ViteService } from './service/vite';
// import { createServer } from 'vite';
import { ViteMiddleware } from './middleware/vite';
import { StaticController } from './controller/static';

@Module({
  imports: [],
  controllers: [StaticController],
  providers: [ViteService],
  exports: [ViteService],
})
export class ViteServiceModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    // const server = await this.viteService.bootstrap();

    // consumer
    //   .apply(server.middlewares)
    //   .forRoutes({ path: '(.*)', method: RequestMethod.ALL });

    consumer
      .apply(ViteMiddleware)
      .forRoutes({ path: '(.*)', method: RequestMethod.ALL });
  }
}

export { ViteService };
