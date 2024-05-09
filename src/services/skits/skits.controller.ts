import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SkitsService } from './skits.service';
import { CreateSkitDto } from './dto/create-skit.dto';
import { UpdateSkitDto } from './dto/update-skit.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';

@Controller('skits')
export class SkitsController {
  constructor(private readonly skitsService: SkitsService) {}

  @UseGuards(AuthGuard)
  @Post()
  createSkit(@Body() createSkitDto: CreateSkitDto, @Request() req: any) {
    return this.skitsService.createSkit(createSkitDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllSkits(@Request() req: any) {
    return this.skitsService.getAllSkits(req.user.sub);
  }

  @Get(':id')
  getSkit(@Param('id') id: string) {
    return this.skitsService.getSkit(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateSkit(@Param('id') id: string, @Body() updateSkitDto: UpdateSkitDto) {
    return this.skitsService.updateSkit(id, updateSkitDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteSkit(@Param('id') id: string) {
    return this.skitsService.deleteSkit(id);
  }
}
