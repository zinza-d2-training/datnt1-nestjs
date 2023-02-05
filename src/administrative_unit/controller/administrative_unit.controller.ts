import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { AdministrativeUnitService } from 'administrative_unit/service/administrative_unit.service';

@Controller('administrative-unit')
export class AdministrativeUnitController {
  constructor(
    @Inject('IMPORT_ADMINISTRATIVE_UNIT_SERVICE')
    private readonly administrativeUnitService: AdministrativeUnitService,
  ) {}

  @Get('provinces')
  async getAllProvinces() {
    return await this.administrativeUnitService.getAllProvinces();
  }

  @Get('districts/:province_id')
  async getDistrictsByprovince_id(
    @Param('province_id', ParseIntPipe) id: number,
  ) {
    return await this.administrativeUnitService.getDistrictsByprovince_id(id);
  }

  @Get('districts')
  async getAllDistricts() {
    return await this.administrativeUnitService.getAllDistricts();
  }

  @Get('wards/:district_id')
  async getWardsBydistrict_id(@Param('district_id', ParseIntPipe) id: number) {
    return await this.administrativeUnitService.getWardsBydistrict_id(id);
  }

  @Get('wards')
  async getAllWards() {
    return await this.administrativeUnitService.getAllWards();
  }
}
