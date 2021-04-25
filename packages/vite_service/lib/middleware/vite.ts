import { Injectable, NestMiddleware } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'node:http';
import { ENV, Envs } from '@seed/common';
import { ViteService } from '../service/vite';

@Injectable()
export class ViteMiddleware implements NestMiddleware {
  constructor(private readonly service: ViteService) {}

  async use(req: IncomingMessage, res: ServerResponse, next: any) {
    if (ENV === Envs.development) {
      (await this.service.bootstrap()).middlewares(req, res, next);
    } else {
      next();
    }
  }
}
