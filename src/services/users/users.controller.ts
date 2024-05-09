import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserInfoDto: CreateUserDto) {
    return this.usersService.createUser(createUserInfoDto);
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.usersService.getUser(username);
  }

  @UseGuards(AuthGuard)
  @Patch()
  updateUser(@Request() req: any, @Body() updateUserInfoDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.sub, updateUserInfoDto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  deleteUser(@Request() req: any) {
    return this.usersService.deleteUser(req.user.sub);
  }
}
