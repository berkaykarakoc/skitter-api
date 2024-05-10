import { DateDataType } from 'sequelize';
import {
  Model,
  Column,
  Default,
  Table,
  Unique,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/services/users/entities/user.entity';

@Table({
  tableName: 'profiles',
  schema: 'skitterapi',
  underscored: true,
})
export class Profile extends Model {
  @Unique
  @Column('username')
  username: string;

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

  @ForeignKey(() => User)
  @Column('user_id')
  userId: string;
}
