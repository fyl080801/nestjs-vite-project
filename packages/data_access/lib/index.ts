import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { TestModel } from './entities/TestModel';

const dbprovider = {
  provide: 'SEQUELIZE',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const config = configService.get<SequelizeOptions>('data_access', {});
    const sequelize = new Sequelize(config);
    return sequelize;
  },
};

@Module({
  providers: [dbprovider],
  exports: [dbprovider],
})
export class DataAccessModule implements OnApplicationBootstrap {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  async onApplicationBootstrap() {
    // 各模块在init注册实体类型，bootstrap初始化数据库
    this.sequelize.addModels([TestModel]);
    await this.sequelize.sync({ alter: { drop: false } });
  }
}
