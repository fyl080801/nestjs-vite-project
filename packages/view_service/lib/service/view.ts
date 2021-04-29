import { Inject, Request } from '@nestjs/common';
import { createServer, ViteDevServer } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import { REQUEST } from '@nestjs/core';
import { renderString } from 'nunjucks';
import { StaticService } from './static';

export class ViewService {
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

    const location = this.staticService.getPath(viewPath[0]);

    const distLocation = path.join(location, view);

    if (fs.existsSync(distLocation)) {
      template = await fs.promises.readFile(distLocation, 'utf-8');
    } else {
      console.log(viewPath);
      const devLocation = path.resolve(
        location,
        '../',
        viewPath.splice(1, viewPath.length).join('/'),
      );

      template = await (await this.bootstrap()).transformIndexHtml(
        this.request.url,
        await fs.promises.readFile(devLocation, 'utf-8'),
      );
    }

    return renderString(template, data);
  }
}