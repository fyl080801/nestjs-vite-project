import { Injectable, NestMiddleware } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'node:http';
import { ENV, Environments } from '@seed/common';
import { ViteService } from '../service/vite';

@Injectable()
export class ViteMiddleware implements NestMiddleware {
  constructor(private readonly service: ViteService) {}

  async use(req: IncomingMessage, res: ServerResponse, next: any) {
    if (ENV === Environments.development) {
      (await this.service.bootstrap()).middlewares(req, res, next);
    } else {
      next();
    }
  }
}
