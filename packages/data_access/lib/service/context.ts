import { Injectable, Inject } from '@nestjs/common';
// import { Model } from 'sequelize-typescript';
import { ConnectionStore, ConnectionBuilder } from '../types';

@Injectable()
export class DataContextService {
  constructor(
    @Inject('DATA_CONNECTION')
    private readonly store: ConnectionStore,
    @Inject('DBFACTORY')
    private readonly createConnection: ConnectionBuilder,
    @Inject('DATA_MODELS')
    private readonly models: any[],
  ) {}

  connection() {
    if (!this.store.instance) {
      this.store.instance = this.createConnection(this.models);
    }
    return this.store.instance;
  }

  async sync() {
    await this.connection().sync({ force: false, alter: true });
  }
}
