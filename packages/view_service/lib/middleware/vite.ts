import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ENV, Environments } from '@nestseed/common';
import { ViewService } from '../service/view';

@Injectable()
export class ViteMiddleware implements NestMiddleware {
  constructor(private readonly service: ViewService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (ENV === Environments.development) {
      (await this.service.bootstrap()).middlewares(req, res, next);
    } else {
      next();
    }
  }
}
