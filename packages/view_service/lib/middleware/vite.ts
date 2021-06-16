import { Injectable, NestMiddleware } from '@nestjs/common';
import { ENV, Environments } from '@nestseed/common';
import { IncomingMessage, ServerResponse } from 'http';
import { ViewService } from '../service/view';

@Injectable()
export class ViteMiddleware implements NestMiddleware {
  constructor(private readonly service: ViewService) {}

  async use(req: IncomingMessage, res: ServerResponse, next: Function) {
    if (ENV === Environments.development) {
      (await this.service.bootstrap()).middlewares(req, res, next);
    } else {
      next();
    }
  }
}
