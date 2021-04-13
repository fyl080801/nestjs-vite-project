import { createServer, ViteDevServer } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

export class ViteService {
  private server: ViteDevServer;

  async bootstrap() {
    if (this.server) {
      return this.server;
    }

    this.server = await createServer({ server: { middlewareMode: true } });

    return this.server;
  }

  async render(url) {
    // const url = request.url;

    // const server = await this.viteService.bootstrap();

    const template = await this.server.transformIndexHtml(
      url,
      await fs.promises.readFile(
        path.resolve(process.cwd(), 'index.html'),
        'utf-8',
      ),
    );

    // const { render } = await this.server.ssrLoadModule('/src/entry-server.ts');

    // const appHtml = await render(url);

    // const html = template.replace(`<!--app-html-->`, appHtml);

    return template; // html;
  }
}
