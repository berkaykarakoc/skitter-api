import { DateDataType } from 'sequelize';
import {
  Column,
  Table,
  Model,
  Default,
  Unique,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'user_details',
  schema: 'skitterapi',
  underscored: true,
})
export class UserDetails extends Model {
  @PrimaryKey
  @Column('username')
  username: string;

  @Unique
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
