import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ModelService, DataContextService } from './service';
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
