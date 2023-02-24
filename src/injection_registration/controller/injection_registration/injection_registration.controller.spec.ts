import { Test, TestingModule } from '@nestjs/testing';
import { InjectionRegistrationController } from './injection_registration.controller';

describe('InjectionRegistrationController', () => {
  let controller: InjectionRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InjectionRegistrationController],
    }).compile();

    controller = module.get<InjectionRegistrationController>(
      InjectionRegistrationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
