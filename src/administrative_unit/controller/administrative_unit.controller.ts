import { Controller, Inject } from '@nestjs/common';
import { AdministrativeUnitService } from 'administrative_unit/service/administrative_unit.service';

@Controller('administrative-unit')
export class AdministrativeUnitController {
  constructor(
    @Inject('IMPORT_ADMINISTRATIVE_UNIT_SERVICE')
    private readonly administrativeUnitService: AdministrativeUnitService,
  ) {}
}
