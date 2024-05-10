import {
  Column,
  Model,
  Unique,
  Table,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Profile } from 'src/services/profiles/entities/profile.entity';
import { Skit } from 'src/services/skits/entities/skit.entity';

@Table({
  tableName: 'users',
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

  @HasOne(() => Profile, 'id')
  profileId: string;

  @HasMany(() => Skit, 'id')
  skits: string[];
}
