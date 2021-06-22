import { Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerResponse } from 'http';
import { AppConfig, RestfulHandler } from '../types';
import { splitPath } from '../utils/resetful';
import { IndexRestfulHandler, ResourceRestfulHandler } from '../service';

@Injectable({ scope: Scope.REQUEST })
export class ModelRestful implements NestMiddleware {
  handlers: RestfulHandler[] = [];

  constructor(
    private readonly configService: ConfigService,
    indexHandler: IndexRestfulHandler,
    resourceHandelr: ResourceRestfulHandler,
  ) {
    this.handlers.push(indexHandler);
    this.handlers.push(resourceHandelr);
  }

  use(req: any, res: ServerResponse, next: () => void) {
    const config = this.configService.get<AppConfig>('app');

    const match = splitPath(
      config?.openapiPrefix || 'openapi',
      req.originalUrl,
    );

    const handler = this.handlers[match.length];

    if (handler) {
      handler.invoke(match, req, res);
    } else {
      next();
    }

    // console.log(match);
    // res.setHeader('content-type', 'application/json');
    // res.write(JSON.stringify({ success: true, url: req.originalUrl }));
    // res.end();
  }
}
