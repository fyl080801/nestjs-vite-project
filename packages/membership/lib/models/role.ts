import {
  Column,
  Table,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user';
import { UserRole } from './userRole';

@Table({ tableName: 'role', updatedAt: false, createdAt: false })
export class Role extends Model<Role> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING(20), allowNull: false })
  rolename: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
