import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkitDto } from './dto/create-skit.dto';
import { UpdateSkitDto } from './dto/update-skit.dto';
import { Skit } from './entities/skit.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SkitsService {
  constructor(
    @InjectModel(Skit)
    private skitsRepository: typeof Skit,
    private sequelize: Sequelize,
  ) {}

  create(createSkitDto: CreateSkitDto) {
    this.skitsRepository.create({
      userId: createSkitDto.userId,
      text: createSkitDto.text,
      totalLikes: createSkitDto.totalLikes,
    });
  }

  async findAll(): Promise<Skit[]> {
    return this.skitsRepository.findAll();
  }

  findOne(id: string): Promise<Skit | null> {
    return this.skitsRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, updateSkitDto: UpdateSkitDto) {
    this.skitsRepository.update(
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

  async remove(id: string): Promise<void> {
    const skit = await this.findOne(id);
    if (!skit) {
      throw new NotFoundException(`Skit with id ${id} not found`);
    }
    await skit.destroy();
  }
}
