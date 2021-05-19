import { Injectable, Inject } from '@nestjs/common';
import { Connection, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class DataContextService {
  constructor(
    @Inject('DATA_CONNECTION')
    private readonly store: any,
    @Inject('TYPEORM')
    private readonly createConnection: (models: any[]) => Promise<Connection>,
    @Inject('DATA_MODELS')
    private readonly models: any[],
  ) {}

  async connection() {
    if (!this.store.instance) {
      this.store.instance = await this.createConnection(this.models);
    }
    return this.store.instance;
  }

  async sync() {
    (await this.connection()).synchronize(false);
  }

  async set<T>(entity: EntityTarget<T>): Promise<Repository<T>> {
    return (await this.connection()).getRepository(entity);
  }
}
