import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { VaccineController } from './vaccine.controller';
import { Vaccine } from 'typeorm/entities/vaccine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine])],
  controllers: [VaccineController],
  providers: [VaccineService],
})
export class VaccineModule {}
