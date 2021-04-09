import { Controller, Get, Request, Header } from '@nestjs/common';
import { ViteService } from '../service/vite';
import * as fs from 'fs';
import * as path from 'path';

@Controller('static')
export class StaticController {
  constructor(private readonly viteService: ViteService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  async index(@Request() request: Request) {
    const url = request.url;

    const server = await this.viteService.bootstrap();

    const template = await server.transformIndexHtml(
      url,
      await fs.promises.readFile(
        path.resolve(process.cwd(), 'index.html'),
        'utf-8',
      ),
    );

    const { render } = await server.ssrLoadModule('/src/entry-server.ts');

    const appHtml = await render(url);

    const html = template.replace(`<!--app-html-->`, appHtml);

    return html;
  }
}
