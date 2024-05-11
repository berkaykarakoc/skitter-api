import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile)
    private profileRepository: typeof Profile,
  ) {}

  async createProfile(
    createProfileDto: CreateProfileDto,
  ): Promise<{ id: string }> {
    const profile = await this.profileRepository.create({
      username: createProfileDto.username,
      email: createProfileDto.email,
      name: createProfileDto.name,
      dateOfBirth: createProfileDto.dateOfBirth,
      country: createProfileDto.country,
      userId: createProfileDto.userId,
    });
    return { id: profile.id };
  }

  async getProfile(userId: string): Promise<Profile> {
    const user = await this.profileRepository.findOne({
      where: { userId },
    });
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return user;
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<[affectedCount: number]> {
    return this.profileRepository.update(updateProfileDto, {
      where: {
        userId,
      },
    });
  }

  async getProfileByUsername(username: string): Promise<Profile> {
    const user = await this.profileRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException(`User ${username} not found`);
    }
    return user;
  }
}
