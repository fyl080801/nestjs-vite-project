import { Table, Column, Model, DataType } from 'sequelize-typescript';
// import { STRING } from 'sequelize';

@Table({ tableName: 'test_model' })
export class TestModel extends Model {
  @Column
  name: string;

  @Column
  age: number;

  @Column
  breed: string;

  @Column({ type: DataType.STRING })
  desc: string;
}
