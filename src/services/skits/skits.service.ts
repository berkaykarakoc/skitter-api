import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkitDto } from './dto/create-skit.dto';
import { UpdateSkitDto } from './dto/update-skit.dto';
import { Skit } from './entities/skit.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';

@Injectable()
export class SkitsService {
  constructor(
    @InjectModel(Skit)
    private skitsRepository: typeof Skit,
    private usersService: UsersService,
  ) {}

  async createSkit(
    createSkitDto: CreateSkitDto,
    userId: string,
  ): Promise<{ skitId: string }> {
    const user = await this.usersService.getUser(userId);
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    const skit = await this.skitsRepository.create({
      text: createSkitDto.text,
      userId,
    });
    return { skitId: skit.id };
  }

  async getSkitsForUser(userId: string): Promise<Skit[]> {
    const user = await this.usersService.getUser(userId);
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return this.skitsRepository.findAll({
      where: {
        userId,
      },
    });
  }

  async getSkitById(id: string): Promise<Skit> {
    const skit = await this.skitsRepository.findByPk(id);
    if (!skit) {
      throw new NotFoundException(`Skit ${id} not found`);
    }
    return skit;
  }

  async updateSkitById(
    id: string,
    updateSkitDto: UpdateSkitDto,
  ): Promise<[affectedCount: number]> {
    return this.skitsRepository.update(updateSkitDto, {
      where: {
        id,
      },
    });
  }

  async deleteSkitById(id: string): Promise<void> {
    const skit = await this.getSkitById(id);
    await skit.destroy();
  }
}
