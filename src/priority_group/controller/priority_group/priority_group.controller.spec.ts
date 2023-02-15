import { Test, TestingModule } from '@nestjs/testing';
import { PriorityGroupController } from './priority_group.controller';

describe('PriorityGroupController', () => {
  let controller: PriorityGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriorityGroupController],
    }).compile();

    controller = module.get<PriorityGroupController>(PriorityGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
