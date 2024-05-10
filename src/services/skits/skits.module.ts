import { Module } from '@nestjs/common';
import { SkitsService } from './skits.service';
import { SkitsController } from './skits.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Skit } from './entities/skit.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Skit]), UsersModule],
  controllers: [SkitsController],
  providers: [SkitsService],
})
export class SkitsModule {}
