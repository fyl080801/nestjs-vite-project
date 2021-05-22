import { Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

export const DATA_MODELS = {
  provide: 'DATA_MODELS',
  scope: Scope.DEFAULT,
  useValue: [],
};

export const DATA_CONNECTION = {
  provide: 'DATA_CONNECTION',
  scope: Scope.REQUEST,
  useValue: { instance: null },
};

export const DBFACTORY = {
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
        query: { raw: false },
        repositoryMode: false,
      });

      return instance;
    };
  },
};
