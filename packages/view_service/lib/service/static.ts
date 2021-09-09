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

  addStatic(root: string, namepath: string) {
    const paths = namepath.split('/');
    const rootPath = path.resolve(root, `../${namepath}`).toString();
    this.setPath(paths[0], path.resolve(root, '../'));
    this.adapterHost.httpAdapter.useStaticAssets(rootPath);
  }
}
