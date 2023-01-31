import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from 'typeorm/entities/district.entity';
import { Province } from 'typeorm/entities/province.entity';
import { Ward } from 'typeorm/entities/ward.entity';
import { AdministrativeUnitController } from './controller/administrative_unit.controller';
import { AdministrativeUnitService } from './service/administrative_unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [AdministrativeUnitController],
  providers: [
    {
      provide: 'IMPORT_ADMINISTRATIVE_UNIT_SERVICE',
      useClass: AdministrativeUnitService,
    },
  ],
})
export class AdministrativeUnitModule {}
