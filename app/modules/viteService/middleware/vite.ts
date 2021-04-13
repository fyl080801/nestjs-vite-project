import { Injectable, NestMiddleware } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'node:http';
import { ViteService } from '../service/vite';

@Injectable()
export class ViteMiddleware implements NestMiddleware {
  constructor(private readonly service: ViteService) {}

  async use(req: IncomingMessage, res: ServerResponse, next: any) {
    (await this.service.bootstrap()).middlewares(req, res, next);
  }
}
