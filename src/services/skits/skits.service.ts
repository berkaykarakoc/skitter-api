import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkitDto } from './dto/create-skit.dto';
import { UpdateSkitDto } from './dto/update-skit.dto';
import { Skit } from './entities/skit.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SkitsService {
  constructor(
    @InjectModel(Skit)
    private skitsRepository: typeof Skit,
  ) {}

  async createSkit(createSkitDto: CreateSkitDto): Promise<{ skitId: string }> {
    const skit = await this.skitsRepository.create({
      userId: createSkitDto.userId,
      text: createSkitDto.text,
      totalLikes: createSkitDto.totalLikes,
    });
    return { skitId: skit.id };
  }

  async getAllSkits(): Promise<Skit[]> {
    return this.skitsRepository.findAll();
  }

  async getSkit(id: string): Promise<Skit> {
    const skit = await this.skitsRepository.findByPk(id);
    if (!skit) {
      throw new NotFoundException(`Skit ${id} not found`);
    }
    return skit;
  }

  async updateSkit(
    id: string,
    updateSkitDto: UpdateSkitDto,
  ): Promise<[affectedCount: number]> {
    return this.skitsRepository.update(
      {
        userId: updateSkitDto.userId,
        text: updateSkitDto.text,
        totalLikes: updateSkitDto.totalLikes,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async deleteSkit(id: string): Promise<void> {
    const skit = await this.getSkit(id);
    await skit.destroy();
  }
}
