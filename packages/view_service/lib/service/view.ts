import { Inject, Injectable, Request, Scope } from '@nestjs/common';
import { createServer } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import { REQUEST } from '@nestjs/core';
import { renderString } from 'nunjucks';
import { StaticService } from './static';
import { Constants } from '../types';

const getCallerFile = function () {
  let filename: string;

  const pst = Error.prepareStackTrace;
  Error.prepareStackTrace = function (err, stack) {
    console.log(stack);
    return stack;
  };

  try {
    let callerfile;
    const err = new Error();
    const currentfile = (<NodeJS.CallSite[]>(err.stack as unknown))
      .shift()
      .getFileName();

    while (err.stack.length) {
      callerfile = (<NodeJS.CallSite[]>(err.stack as unknown))
        .shift()
        .getFileName();

      if (currentfile !== callerfile) {
        filename = callerfile;
        break;
      }
    }
  } catch (err) {}

  Error.prepareStackTrace = pst;

  return filename;
};

@Injectable({ scope: Scope.REQUEST })
export class ViewService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @Inject('constants') private readonly constants: Constants,
    private readonly staticService: StaticService,
  ) {}

  async bootstrap() {
    if (!this.constants.server) {
      this.constants.server = await createServer();
    }
    return this.constants.server;
  }

  async destroy() {
    await this.constants.server.close();
    this.constants.server = null;
  }

  async render(view: string, data?: any) {
    const viewPath = view.split('/');

    let template = '';

    const location = this.staticService.getPath(viewPath[0]);

    const distLocation = path.join(location, view);

    if (fs.existsSync(distLocation)) {
      template = await fs.promises.readFile(distLocation, 'utf-8');
    } else {
      const devLocation = path.resolve(
        location,
        './',
        viewPath.splice(1, viewPath.length).join('/'),
      );

      template = await (
        await this.bootstrap()
      ).transformIndexHtml(
        this.request.url,
        await fs.promises.readFile(devLocation, 'utf-8'),
      );
    }

    return renderString(template, data);
  }
}
