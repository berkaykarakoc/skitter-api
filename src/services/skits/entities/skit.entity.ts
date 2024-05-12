import {
  Column,
  Table,
  Model,
  Default,
  ForeignKey,
  Unique,
} from 'sequelize-typescript';
import { User } from 'src/services/users/entities/user.entity';

@Table({
  tableName: 'skits',
  schema: 'skitterapi',
  underscored: true,
})
export class Skit extends Model {
  @Unique
  @Column('username')
  username: string;

  @Column('text')
  text: string;

  @Default(0)
  @Column('total_likes')
  totalLikes: number;

  @ForeignKey(() => User)
  @Column('user_id')
  userId: string;
}
