import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ModelService } from './service/model';
import { DataContextService } from './service/context';
import { DATA_CONNECTION, DATA_MODELS, DBFACTORY } from './provider/core';

@Module({
  providers: [
    DATA_CONNECTION,
    DBFACTORY,
    DATA_MODELS,
    ModelService,
    DataContextService,
  ],
  exports: [ModelService, DataContextService],
})
export class DataAccessModule implements OnApplicationBootstrap {
  constructor(private readonly context: DataContextService) {}

  async onApplicationBootstrap() {
    await this.context.sync();
  }
}

export { ModelService, DataContextService };
