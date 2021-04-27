import { Inject, Request } from '@nestjs/common';
import { createServer, ViteDevServer } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import { REQUEST } from '@nestjs/core';
import { renderString } from 'nunjucks';
import { ENV, Environments, MODULE_PATH } from '@seed/common';
import { StaticService } from './static';

export class ViteService {
  private server: ViteDevServer;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly staticService: StaticService,
  ) {}

  async bootstrap() {
    return (this.server = this.server || (await createServer()));
  }

  async render(view: string, data?: any) {
    const viewPath = view.split('/');

    let template = '';

    // 如果是包引用+本地开发会出问题，先不管
    if (ENV === Environments.development) {
      template = await (await this.bootstrap()).transformIndexHtml(
        this.request.url,
        await fs.promises.readFile(path.join(MODULE_PATH, view), 'utf-8'),
      );
    } else {
      template = await fs.promises.readFile(
        path.join(this.staticService.getPath(viewPath[0]), view),
        'utf-8',
      );
    }

    return renderString(template, data);
  }
}
