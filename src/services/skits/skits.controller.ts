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
  createSkitForUser(@Body() createSkitDto: CreateSkitDto, @Request() req: any) {
    return this.skitsService.createSkit(createSkitDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  getSkitsForUser(@Request() req: any) {
    return this.skitsService.getSkitsForUser(req.user.sub);
  }

  @Get(':id')
  getSkitById(@Param('id') id: string) {
    return this.skitsService.getSkitById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateSkitById(
    @Param('id') id: string,
    @Body() updateSkitDto: UpdateSkitDto,
  ) {
    return this.skitsService.updateSkitById(id, updateSkitDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteSkitById(@Param('id') id: string) {
    return this.skitsService.deleteSkitById(id);
  }
}
