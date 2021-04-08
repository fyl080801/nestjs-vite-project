import { Injectable, NestMiddleware } from '@nestjs/common';
import { ViteService } from '../service/vite';

@Injectable()
export class ViteMiddleware implements NestMiddleware {
  constructor(private readonly service: ViteService) {}

  async use(req: Request, res: Response, next: any) {
    await this.service.bootstrap();
    await next();
  }
}
