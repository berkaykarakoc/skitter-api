import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get(':userId')
  getProfileByUserId(@Param('userId') userId: string) {
    return this.profilesService.getProfileByUserId(userId);
  }

  @Patch(':userId')
  updateProfileByUserId(
    @Param('userId') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.updateProfileByUserId(userId, updateProfileDto);
  }
}
