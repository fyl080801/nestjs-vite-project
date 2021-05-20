import { Injectable, Inject } from '@nestjs/common';
import { EntityTarget, Repository } from 'typeorm';
import { ConnectionStore, TypeOrmBuilder } from '../types';

@Injectable()
export class DataContextService {
  constructor(
    @Inject('DATA_CONNECTION')
    private readonly store: ConnectionStore,
    @Inject('TYPEORM')
    private readonly createConnection: TypeOrmBuilder,
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
    // 考虑如何实现数据迁移
    // await (await this.connection()).runMigrations({ transaction: 'all' });
    // const log = await (await this.connection()).driver
    //   .createSchemaBuilder()
    //   .log();

    // console.log(log.upQueries);
    await (await this.connection()).synchronize(false);
  }

  async set<T>(entity: EntityTarget<T>): Promise<Repository<T>> {
    return (await this.connection()).getRepository(entity);
  }
}
