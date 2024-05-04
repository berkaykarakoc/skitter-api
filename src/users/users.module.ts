import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDetails } from './entities/user-details.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    SequelizeModule.forFeature([UserDetails]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
