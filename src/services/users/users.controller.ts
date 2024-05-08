import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { CreateUserDetailsDto } from './dto/create-user-details.dto';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserInfoDto: CreateUserDto) {
    return this.usersService.createUser(createUserInfoDto);
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.usersService.getUser(username);
  }

  @Patch(':username')
  updateUser(
    @Param('username') username: string,
    @Body() updateUserInfoDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(username, updateUserInfoDto);
  }

  @Delete(':username')
  deleteUser(@Param('username') username: string) {
    return this.usersService.deleteUser(username);
  }

  @UseGuards(AuthGuard)
  @Post('details')
  createUserDetails(@Body() createUserDetailsDto: CreateUserDetailsDto) {
    return this.usersService.createUserDetails(createUserDetailsDto);
  }

  @UseGuards(AuthGuard)
  @Get(':username/details')
  async getUserDetails(@Param('username') username: string) {
    const userDetails = await this.usersService.getUserDetails(username);
    return userDetails;
  }

  @UseGuards(AuthGuard)
  @Patch(':username/details')
  updateUserDetails(
    @Param('username') username: string,
    @Body() updateUserInfoDto: UpdateUserDetailsDto,
  ) {
    return this.usersService.updateUserDetails(username, updateUserInfoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':username/details')
  deleteUserDetails(@Param('username') username: string) {
    return this.usersService.deleteUserDetails(username);
  }
}
