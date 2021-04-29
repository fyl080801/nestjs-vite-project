import { ENV, Environments } from '@seed/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StaticService {
  private readonly map = new Map<string, string>();

  constructor(private readonly adapterHost: HttpAdapterHost) {}

  setPath(name: string, path: string) {
    this.map.set(name, path);
  }

  getPath(name: string) {
    return this.map.get(name);
  }

  addStatic(name: string, root: string) {
    if (ENV === Environments.production) {
      this.setPath(name, path.resolve(root, '../'));
      this.adapterHost.httpAdapter.useStaticAssets({
        root: path.resolve(root, `../${name}`),
        prefix: `/${name}`,
        decorateReply: false,
      });
    }
  }
}
