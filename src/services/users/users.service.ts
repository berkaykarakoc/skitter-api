import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { hashPassword } from 'src/utils/hash-password.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ username: string }> {
    const user = await this.userRepository.create({
      username: createUserDto.username,
      password: await hashPassword(createUserDto.password),
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      dateOfBirth: createUserDto.dateOfBirth,
      country: createUserDto.country,
    });
    return { username: user.username };
  }

  async getUser(username: string): Promise<User> {
    const user = await this.userRepository.findByPk(username);
    if (!user) {
      throw new NotFoundException(`User ${username} not found`);
    }
    return user;
  }

  async updateUser(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<[affectedCount: number]> {
    return this.userRepository.update(
      {
        username: updateUserDto.username,
        password: await hashPassword(updateUserDto.password!),
        email: updateUserDto.email,
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        dateOfBirth: updateUserDto.dateOfBirth,
        country: updateUserDto.country,
        totalFollowers: updateUserDto.totalFollowers,
      },
      {
        where: {
          username,
        },
      },
    );
  }

  async deleteUser(username: string): Promise<void> {
    const user = await this.getUser(username);
    await user.destroy();
  }
}
