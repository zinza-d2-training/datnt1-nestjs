import { Test, TestingModule } from '@nestjs/testing';
import { PriorityGroupService } from './priority_group.service';

describe('PriorityGroupService', () => {
  let service: PriorityGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriorityGroupService],
    }).compile();

    service = module.get<PriorityGroupService>(PriorityGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
