import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationSiteController } from './vaccination_site.controller';

describe('VaccinationSiteController', () => {
  let controller: VaccinationSiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationSiteController],
    }).compile();

    controller = module.get<VaccinationSiteController>(
      VaccinationSiteController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
