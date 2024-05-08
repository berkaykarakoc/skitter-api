import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user_login',
  schema: 'skitterapi',
  underscored: true,
})
export class User extends Model {
  @PrimaryKey
  @Column('username')
  username: string;

  @Column('password')
  password: string;

  @Column('email')
  email: string;
}
