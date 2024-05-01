import { Module } from '@nestjs/common';
import { SkitsService } from './skits.service';
import { SkitsController } from './skits.controller';

@Module({
  controllers: [SkitsController],
  providers: [SkitsService],
})
export class SkitsModule {}
