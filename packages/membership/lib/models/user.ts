import { Column, Table, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'user', updatedAt: false, createdAt: false })
export class User extends Model {
  @Column({ primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING(20), allowNull: false })
  username: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  password: string;
}
