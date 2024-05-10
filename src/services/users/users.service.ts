import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { hashPassword } from 'src/utils/hash-password.util';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private profilesService: ProfilesService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ user_id: string; profile_id: string }> {
    const user = await this.userRepository.create({
      username: createUserDto.username,
      password: await hashPassword(createUserDto.password!),
      email: createUserDto.email,
    });
    const profile = await this.profilesService.createProfile({
      username: createUserDto.username,
      email: createUserDto.email,
      userId: user.id,
    });
    return { user_id: user.id, profile_id: profile.id };
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException(`User ${username} not found`);
    }
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<[affectedCount: number]> {
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }
    return this.userRepository.update(updateUserDto, {
      where: {
        id,
      },
    });
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUser(id);
    await user.destroy();
  }
}
