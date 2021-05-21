import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { User } from './user';
import { Role } from './role';

@Table({ tableName: 'user_role', updatedAt: false, createdAt: false })
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Role)
  @Column
  roleId: number;
}
