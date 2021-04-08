import { createServer, ViteDevServer } from 'vite';

export class ViteService {
  private server: ViteDevServer;

  async bootstrap() {
    if (this.server) {
      return;
    }

    this.server = await createServer();

    this.server.listen(0);
  }
}
