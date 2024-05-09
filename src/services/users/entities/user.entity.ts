import { DateDataType } from 'sequelize';
import {
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
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

  @Column('first_name')
  firstName: string;

  @Column('last_name')
  lastName: string;

  @Column('date_of_birth')
  dateOfBirth: DateDataType;

  @Column('country')
  country: string;

  @Default(0)
  @Column('total_followers')
  totalFollowers: number;
}
