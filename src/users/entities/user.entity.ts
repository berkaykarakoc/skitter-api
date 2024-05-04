import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'user_login',
  schema: 'skitterapi',
  underscored: true,
})
export class User extends Model {
  @Unique
  @Column('username')
  username: string;

  @Column('password')
  password: string;

  @Column('email')
  email: string;
}
