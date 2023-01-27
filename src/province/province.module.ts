import { Module } from '@nestjs/common';
import { ProvinceController } from './controller/province/province.controller';
import { ProvinceService } from './service/province/province.service';

@Module({
  controllers: [ProvinceController],
  providers: [ProvinceService]
})
export class ProvinceModule {}
