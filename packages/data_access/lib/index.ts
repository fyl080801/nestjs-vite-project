import { Inject, Module, OnApplicationBootstrap, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { TestModel } from './entities/TestModel';

const SEQUELIZE = {
  provide: 'SEQUELIZE',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const config = configService.get<SequelizeOptions>('data_access', {});
    const sequelize = new Sequelize(config);
    return sequelize;
  },
};

const DATA_MODELS = {
  provide: 'DATA_MODELS',
  scope: Scope.DEFAULT,
  useValue: [],
};

@Module({
  providers: [SEQUELIZE, DATA_MODELS],
  exports: [SEQUELIZE, DATA_MODELS],
})
export class DataAccessModule implements OnApplicationBootstrap {
  constructor(
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    @Inject('DATA_MODELS') private readonly dataModels: any[],
  ) {}

  async onApplicationBootstrap() {
    // console.log([TestModel, ...this.dataModels]);
    // 各模块在init注册实体类型，bootstrap初始化数据库
    this.sequelize.addModels([TestModel, ...this.dataModels]);
    await this.sequelize.sync({ alter: { drop: false } });
  }
}
