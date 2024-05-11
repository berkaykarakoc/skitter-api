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
  getSkits(@Request() req: any) {
    return this.skitsService.getSkits(req.user.sub);
  }

  @Get(':username')
  getSkitsByUsername(@Param('username') username: string) {
    return this.skitsService.getSkitsByUsername(username);
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
