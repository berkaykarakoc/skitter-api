import { Test, TestingModule } from '@nestjs/testing';
import { SkitsController } from './skits.controller';
import { SkitsService } from './skits.service';

describe('SkitsController', () => {
  let controller: SkitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkitsController],
      providers: [SkitsService],
    }).compile();

    controller = module.get<SkitsController>(SkitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
