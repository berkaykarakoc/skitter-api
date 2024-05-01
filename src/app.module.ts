import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkitsModule } from './skits/skits.module';

@Module({
  imports: [SkitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
