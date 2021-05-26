import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'rule', createdAt: false, updatedAt: false })
export class Rule extends Model<Rule> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  roleId: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  code: string;
}
