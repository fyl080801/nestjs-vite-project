import { Connection } from 'typeorm';

export interface TypeOrmBuilder {
  (models: any[]): Promise<Connection>;
}

export interface ConnectionStore {
  instance?: Connection;
}
