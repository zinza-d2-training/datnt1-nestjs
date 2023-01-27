import { Controller, Inject } from '@nestjs/common';
import { AdministrativeUnitService } from 'src/administrative_unit/service/administrative_unit.service';

@Controller('administrative-unit')
export class AdministrativeUnitController {
  constructor(
    @Inject('IMPORT_UNIT_ADMINISTRATIVE_SERVER')
    private readonly administrativeUnitService: AdministrativeUnitService
  ) {}
}
