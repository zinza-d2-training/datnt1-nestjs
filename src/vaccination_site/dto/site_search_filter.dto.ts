import { IsString } from 'class-validator';

export class SiteSearchFilterDto {
  @IsString()
  province_id?: string;

  @IsString()
  district_id?: string;

  @IsString()
  ward_id?: string;
}
