import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'map_acl', createdAt: false, updatedAt: false })
export class MapAcl extends Model<MapAcl> {
  @Column({ allowNull: false })
  roleId: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  path: string;
}
