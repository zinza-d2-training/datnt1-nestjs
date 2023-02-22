import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class VaccinationSiteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  leader: string;

  @IsNotEmpty()
  @Min(1)
  number_of_tables: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  ward_id: number;
}
