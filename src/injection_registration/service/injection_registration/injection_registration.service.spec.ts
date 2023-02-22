import { Test, TestingModule } from '@nestjs/testing';
import { InjectionRegistrationService } from './injection_registration.service';

describe('InjectionRegistrationService', () => {
  let service: InjectionRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InjectionRegistrationService],
    }).compile();

    service = module.get<InjectionRegistrationService>(InjectionRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
