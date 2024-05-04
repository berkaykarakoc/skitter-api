import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SkitsService } from './skits.service';
import { CreateSkitDto } from './dto/create-skit.dto';
import { UpdateSkitDto } from './dto/update-skit.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('skits')
export class SkitsController {
  constructor(private readonly skitsService: SkitsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSkitDto: CreateSkitDto) {
    return this.skitsService.create(createSkitDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.skitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skitsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkitDto: UpdateSkitDto) {
    return this.skitsService.update(id, updateSkitDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skitsService.remove(id);
  }
}
