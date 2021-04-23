import { Inject, Request } from '@nestjs/common';
import { createServer, ViteDevServer } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import { REQUEST } from '@nestjs/core';
import { renderString } from 'nunjucks';
import { ENV, Envs, MODULE_PATH } from '@seed/common';

export class ViteService {
  private server: ViteDevServer;

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  async bootstrap() {
    return (this.server = this.server || (await createServer()));
  }

  async render(view: string, data?: any) {
    const viewPath = view.split('/');

    let template = '';

    if (ENV === Envs.development) {
      viewPath.splice(1, 0, 'src');
      template = await (await this.bootstrap()).transformIndexHtml(
        this.request.url,
        await fs.promises.readFile(
          path.join(MODULE_PATH, viewPath.join('/')),
          'utf-8',
        ),
      );
    } else {
      //
    }

    return renderString(template, data);
  }
}
