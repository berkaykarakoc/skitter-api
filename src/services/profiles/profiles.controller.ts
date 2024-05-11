import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req: any) {
    return this.profilesService.getProfile(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':userId')
  updateProfileByUserId(
    @Request() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateProfile(req.user.sub, updateProfileDto);
  }

  @Get(':username')
  getProfileByUsername(@Param('username') username: string) {
    return this.profilesService.getProfileByUsername(username);
  }
}
