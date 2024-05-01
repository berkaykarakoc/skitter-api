import { Test, TestingModule } from '@nestjs/testing';
import { SkitsService } from './skits.service';

describe('SkitsService', () => {
  let service: SkitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkitsService],
    }).compile();

    service = module.get<SkitsService>(SkitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
