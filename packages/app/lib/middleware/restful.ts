import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerResponse } from 'http';
import { AppConfig, RestfulHandler } from '../types';
import { splitPath } from '../utils/resetful';
import { IndexRestfulHandler } from '../service';

// const handlers = [
//   (prefix: string) => (req: any, res: ServerResponse, next: () => void) => {},
// ];

@Injectable()
export class ModelRestful implements NestMiddleware {
  handlers: RestfulHandler[] = [];

  constructor(
    private readonly configService: ConfigService,
    indexHandler: IndexRestfulHandler,
  ) {
    this.handlers.push(indexHandler);
  }

  use(req: any, res: ServerResponse, next: () => void) {
    const config = this.configService.get<AppConfig>('app');

    const match = splitPath(
      config?.openapiPrefix || 'openapi',
      req.originalUrl,
    );

    const handler = this.handlers[match.length];

    if (handler) {
      handler.invoke(req, res);
    } else {
      next();
    }

    // console.log(match);
    // res.setHeader('content-type', 'application/json');
    // res.write(JSON.stringify({ success: true, url: req.originalUrl }));
    // res.end();
  }
}
