import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { TestModel } from './entities/TestModel';

const dbprovider = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '!QAZ2wsx',
      database: 'nesttest',
    });
    sequelize.addModels([TestModel]);
    await sequelize.sync({ alter: { drop: false } });
    return sequelize;
  },
};

@Module({
  providers: [dbprovider],
  exports: [dbprovider],
})
export class DataAccessModule implements OnApplicationBootstrap, OnModuleInit {
  onApplicationBootstrap() {
    console.log('boot');
  }

  onModuleInit() {
    console.log('init');
  }
}
