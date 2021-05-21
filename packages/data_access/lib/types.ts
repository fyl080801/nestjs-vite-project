import { Sequelize } from 'sequelize-typescript';

export interface ConnectionBuilder {
  (models: any[]): Sequelize;
}

export interface ConnectionStore {
  instance?: Sequelize;
}
