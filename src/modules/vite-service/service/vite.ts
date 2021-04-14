import { Inject, Request } from '@nestjs/common';
import { createServer, ViteDevServer } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import { REQUEST } from '@nestjs/core';
import { renderString } from 'nunjucks';

export class ViteService {
  private server: ViteDevServer;

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  async bootstrap() {
    return (this.server = this.server || (await createServer()));
  }

  async render(view: string, data?: any) {
    const template = await this.server.transformIndexHtml(
      this.request.url,
      await fs.promises.readFile(
        path.resolve(process.cwd(), 'src/modules', view),
        'utf-8',
      ),
    );

    return renderString(template, data);
  }
}
