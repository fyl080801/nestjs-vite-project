// import { Injectable, Scope } from '@nestjs/common';

export class ViewConstantsService {
  constructor(private readonly map = new Map<string, string>()) {}

  setPath(name: string, path: string) {
    this.map.set(name, path);
  }

  getPath(name: string) {
    return this.map.get(name);
  }
}
