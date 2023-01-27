import { Module } from '@nestjs/common';
import { DistrictController } from './controller/district/district.controller';
import { DistrictService } from './service/district/district.service';

@Module({
  controllers: [DistrictController],
  providers: [DistrictService]
})
export class DistrictModule {}
