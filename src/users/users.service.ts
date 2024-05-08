import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { hashPassword } from 'utils/hash-password.util';
import { UserDetails } from './entities/user-details.entity';
import { CreateUserDetailsDto } from './dto/create-user-details.dto';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    @InjectModel(UserDetails)
    private userDetailsRepository: typeof UserDetails,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ username: string }> {
    const user = await this.userRepository.create({
      username: createUserDto.username,
      password: await hashPassword(createUserDto.password),
      email: createUserDto.email,
    });
    await this.createUserDetails({
      username: createUserDto.username,
      email: createUserDto.email,
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
    await this.deleteUserDetails(username);
  }

  async createUserDetails(
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<void> {
    await this.userDetailsRepository.create({
      username: createUserDetailsDto.username,
      email: createUserDetailsDto.email,
      firstName: createUserDetailsDto.firstName,
      lastName: createUserDetailsDto.lastName,
      dateOfBirth: createUserDetailsDto.dateOfBirth,
      country: createUserDetailsDto.country,
      totalFollowers: createUserDetailsDto.totalFollowers,
    });
  }

  async getUserDetails(username: string): Promise<UserDetails> {
    const userDetails = await this.userDetailsRepository.findByPk(username);
    if (!userDetails) {
      throw new NotFoundException(`User Details ${username} not found`);
    }
    return userDetails;
  }

  async updateUserDetails(
    username: string,
    updateUserDetailsDto: UpdateUserDetailsDto,
  ): Promise<[affectedCount: number]> {
    return this.userDetailsRepository.update(
      {
        username: updateUserDetailsDto.username,
        email: updateUserDetailsDto.email,
        firstName: updateUserDetailsDto.firstName,
        lastName: updateUserDetailsDto.lastName,
        dateOfBirth: updateUserDetailsDto.dateOfBirth,
        country: updateUserDetailsDto.country,
        totalFollowers: updateUserDetailsDto.totalFollowers,
      },
      {
        where: {
          username,
        },
      },
    );
  }

  async deleteUserDetails(username: string): Promise<void> {
    const userDetails = await this.getUserDetails(username);
    await userDetails.destroy();
  }
}
