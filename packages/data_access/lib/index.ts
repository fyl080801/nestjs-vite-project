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
        logging: false,
        dropSchema: false,
        synchronize: false,
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
  constructor(
    private readonly context: DataContextService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    // 理论上生产环境不应开启自动同步
    // 如果有动态建表需求需要用typeorm的数据库操作api配合界面管理实现
    const config = this.configService.get<ConnectionOptions>('data_access', {
      type: 'mysql',
    });
    if (config.synchronize) {
      this.context.sync();
    }
  }
}

export { ModelService, DataContextService };
