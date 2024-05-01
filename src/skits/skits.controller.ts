import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkitsService } from './skits.service';
import { CreateSkitDto } from './dto/create-skit.dto';
import { UpdateSkitDto } from './dto/update-skit.dto';

@Controller('skits')
export class SkitsController {
  constructor(private readonly skitsService: SkitsService) {}

  @Post()
  create(@Body() createSkitDto: CreateSkitDto) {
    return this.skitsService.create(createSkitDto);
  }

  @Get()
  findAll() {
    return this.skitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkitDto: UpdateSkitDto) {
    return this.skitsService.update(+id, updateSkitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skitsService.remove(+id);
  }
}
