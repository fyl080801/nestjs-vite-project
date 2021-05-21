import { Module, OnApplicationBootstrap, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
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

const DBFACTORY = {
  provide: 'DBFACTORY',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const config = configService.get<SequelizeOptions>('data_access', {
      dialect: 'mysql',
    });

    return (models: any[]) => {
      const instance = new Sequelize({
        ...config,
        models,
        query: { raw: true },
        repositoryMode: false,
      });

      return instance;
    };
  },
};

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
