import { createServer, ViteDevServer } from 'vite';

export class ViteService {
  private server: ViteDevServer;

  async bootstrap() {
    if (this.server) {
      return this.server;
    }

    this.server = await createServer({ server: { middlewareMode: true } });

    return this.server;
  }
}
