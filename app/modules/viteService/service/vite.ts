import { Inject, Request } from '@nestjs/common';
import { createServer, ViteDevServer } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import { REQUEST } from '@nestjs/core';

export class ViteService {
  private server: ViteDevServer;

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  async bootstrap() {
    if (this.server) {
      return this.server;
    }

    this.server = await createServer();

    return this.server;
  }

  async render(view: string) {
    const url = this.request.url;

    const template = await this.server.transformIndexHtml(
      url,
      await fs.promises.readFile(
        path.resolve(process.cwd(), 'app/modules', view),
        'utf-8',
      ),
    );

    // const { render } = await this.server.ssrLoadModule('/src/entry-server.ts');

    // const appHtml = await render(url);

    // const html = template.replace(`<!--app-html-->`, appHtml);

    return template; // html;
  }
}
