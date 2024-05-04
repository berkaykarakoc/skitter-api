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

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({
      username: createUserDto.username,
      password: await hashPassword(createUserDto.password),
      email: createUserDto.email,
    });
    return user.id;
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(
      {
        username: updateUserDto.username,
        password: await hashPassword(updateUserDto.password!),
        email: updateUserDto.email,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User Info with id ${id} not found`);
    }
    await user.destroy();
  }

  async createUserDetails(createUserDetailsDto: CreateUserDetailsDto) {
    const userDetails = await this.userDetailsRepository.create({
      id: createUserDetailsDto.id,
      username: createUserDetailsDto.username,
      email: createUserDetailsDto.email,
      firstName: createUserDetailsDto.firstName,
      lastName: createUserDetailsDto.lastName,
      dateOfBirth: createUserDetailsDto.dateOfBirth,
      country: createUserDetailsDto.country,
      totalFollowers: createUserDetailsDto.totalFollowers,
    });
    return userDetails.id;
  }

  async findOneUserDetails(id: string): Promise<UserDetails | null> {
    return this.userDetailsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateUserDetails(
    id: string,
    updateUserDetailsDto: UpdateUserDetailsDto,
  ) {
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
          id,
        },
      },
    );
  }

  async removeUserDetails(id: string) {
    const userDetails = await this.findOne(id);
    if (!userDetails) {
      throw new NotFoundException(`User Info with id ${id} not found`);
    }
    await userDetails.destroy();
  }
}
