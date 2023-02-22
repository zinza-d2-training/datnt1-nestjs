import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VaccinationSiteController } from './controller/vaccination_site/vaccination_site.controller';
import { VaccinationSiteService } from './service/vaccination_site/vaccination_site.service';
import { VaccinationSite } from 'typeorm/entities/vaccination_site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccinationSite])],
  controllers: [VaccinationSiteController],
  providers: [VaccinationSiteService],
})
export class VaccinationSiteModule {}
