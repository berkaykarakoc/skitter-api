import { Injectable } from '@nestjs/common';
import { CreateSkitDto } from './dto/create-skit.dto';
import { UpdateSkitDto } from './dto/update-skit.dto';

@Injectable()
export class SkitsService {
  create(createSkitDto: CreateSkitDto) {
    return 'This action adds a new skit';
  }

  findAll() {
    return `This action returns all skits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skit`;
  }

  update(id: number, updateSkitDto: UpdateSkitDto) {
    return `This action updates a #${id} skit`;
  }

  remove(id: number) {
    return `This action removes a #${id} skit`;
  }
}
