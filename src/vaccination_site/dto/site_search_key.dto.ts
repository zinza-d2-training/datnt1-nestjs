import { IsString } from 'class-validator';

export class SiteSearchKeyDto {
  @IsString()
  name?: string;

  @IsString()
  address?: string;
}
