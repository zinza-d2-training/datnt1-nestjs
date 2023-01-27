import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Command } from '@squareboat/nest-console';
import { ConsoleIO } from '@squareboat/nest-console/dist/consoleIO';
import * as XLSX from 'xlsx';

import { Province } from 'src/typeorm/entities/province.entity';
import { District } from 'src/typeorm/entities/district.entity';
import { Ward } from 'src/typeorm/entities/ward.entity';

@Injectable()
export class AdministrativeUnitService {
  constructor(
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>
  ) {}

  @Command('import', {
    desc: 'Import data from excel file into mysql database'
  })
  async importFile(_cli: ConsoleIO) {
    const provinces = [];
    const districts = [];
    const wards = [];

    _cli.info('Importing file into mysql database ... ');

    const administrativeUnitData = XLSX.readFile(
      'src/utils/excels/Danh sách cấp xã ___18_01_2023.xls'
    ).Sheets;

    const administrativeUnits = XLSX.utils.sheet_to_json(
      administrativeUnitData['Sheet1']
    );

    for (const administrativeUnit of administrativeUnits) {
      const isExistListProvince: boolean = provinces.some(
        (province) => province.name == administrativeUnit['Tỉnh / Thành Phố']
      );
      if (!isExistListProvince) {
        provinces.push({ name: administrativeUnit['Tỉnh / Thành Phố'] });
      }
    }

    await this.provinceRepository.insert(provinces);

    const listProvinceFromDB = await this.provinceRepository.find();
    for (const administrativeUnit of administrativeUnits) {
      for (const provinceFromDB of listProvinceFromDB) {
        if (provinceFromDB.name === administrativeUnit['Tỉnh / Thành Phố']) {
          const isExistedDistrict = districts.some(
            (district) => district.name === administrativeUnit['Quận Huyện']
          );
          if (!isExistedDistrict) {
            districts.push({
              name: administrativeUnit['Quận Huyện'],
              province_id: provinceFromDB.province_id
            });
          }
        }
      }
    }
    await this.districtRepository.insert(districts);

    const listDistrictFromDB = await this.districtRepository.find();
    for (const administrativeUnit of administrativeUnits) {
      for (const district of listDistrictFromDB) {
        if (district.name === administrativeUnit['Quận Huyện']) {
          wards.push({
            name: administrativeUnit['Tên'] || 'Undefined data',
            district_id: district.district_id
          });
        }
      }
    }
    await this.wardRepository.insert(wards);
  }
}
