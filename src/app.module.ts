import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkitsModule } from './services/skits/skits.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Skit } from './services/skits/entities/skit.entity';
import { AuthModule } from './services/auth/auth.module';
import { UsersModule } from './services/users/users.module';
import { User } from './services/users/entities/user.entity';
import { ProfilesModule } from './services/profiles/profiles.module';
import { Profile } from './services/profiles/entities/profile.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [Skit, User, Profile],
    }),
    SkitsModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
