import { IsString } from 'class-validator';

export class RegisterSearchFilterDto {
  @IsString()
  fullname?: string;

  @IsString()
  identification_card?: string;
}
