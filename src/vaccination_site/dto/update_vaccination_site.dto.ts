import { PartialType } from '@nestjs/mapped-types';
import { VaccinationSiteDto } from './vaccination_site.dto';

export class UpdateVaccinationSiteDto extends PartialType(VaccinationSiteDto) {}
