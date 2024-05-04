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
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDetailsDto } from './dto/create-user-details.dto';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserInfoDto: CreateUserDto) {
    return this.usersService.create(createUserInfoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserInfoDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post('details')
  createUserDetails(@Body() createUserDetailsDto: CreateUserDetailsDto) {
    return this.usersService.createUserDetails(createUserDetailsDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id/details')
  findOneUserDetails(@Param('id') id: string) {
    return this.usersService.findOneUserDetails(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/details')
  updateUserDetails(
    @Param('id') id: string,
    @Body() updateUserInfoDto: UpdateUserDetailsDto,
  ) {
    return this.usersService.updateUserDetails(id, updateUserInfoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/details')
  removeUserDetails(@Param('id') id: string) {
    return this.usersService.removeUserDetails(id);
  }
}
