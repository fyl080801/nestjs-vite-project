import { Table, Column, Model } from 'sequelize-typescript';
import { STRING } from 'sequelize';

@Table({ tableName: 'user' })
export class User extends Model {
  @Column({ primaryKey: true })
  id: number;

  @Column({ type: STRING(20) })
  username: string;

  @Column({ type: STRING(255) })
  password: string;
}
