import { Column, Table, Model, Default } from 'sequelize-typescript';

@Table({
  tableName: 'skits',
  schema: 'skitterapi',
  underscored: true,
})
export class Skit extends Model {
  @Column('username')
  username: string;

  @Column('text')
  text: string;

  @Default(0)
  @Column('total_likes')
  totalLikes: number;
}
