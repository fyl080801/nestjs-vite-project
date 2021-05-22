import {
  Column,
  Table,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Role } from './role';
import { UserRole } from './userRole';

@Table({ tableName: 'user', updatedAt: false, createdAt: false })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING(20), allowNull: false })
  username: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
