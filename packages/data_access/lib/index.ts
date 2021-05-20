import { Module, OnApplicationBootstrap, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createConnection, ConnectionOptions } from 'typeorm';
import { ModelService } from './service/model';
import { DataContextService } from './service/context';

const DATA_MODELS = {
  provide: 'DATA_MODELS',
  scope: Scope.DEFAULT,
  useValue: [],
};

const DATA_CONNECTION = {
  provide: 'DATA_CONNECTION',
  scope: Scope.REQUEST,
  useValue: { instance: null },
};

const TYPEORM = {
  provide: 'TYPEORM',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const config = configService.get<ConnectionOptions>('data_access', {
      type: 'mysql',
    });
    return async (entities: any[]) =>
      await createConnection({
        ...config,
        logging: true,
        dropSchema: false,
        entities,
      });
  },
};

@Module({
  providers: [
    DATA_CONNECTION,
    TYPEORM,
    DATA_MODELS,
    ModelService,
    DataContextService,
  ],
  exports: [ModelService, DataContextService],
})
export class DataAccessModule implements OnApplicationBootstrap {
  constructor(private readonly context: DataContextService) {}

  async onApplicationBootstrap() {
    this.context.sync();
  }
}

export { ModelService, DataContextService };
