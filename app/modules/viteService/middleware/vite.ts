import { Injectable, NestMiddleware } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'node:http';
import { ViteService } from '../service/vite';

@Injectable()
export class ViteMiddleware implements NestMiddleware {
  constructor(private readonly service: ViteService) {}

  async use(req: IncomingMessage, res: ServerResponse, next: any) {
    const server = await this.service.bootstrap();

    server.middlewares(req, res, next);
  }
}
