import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { CreateInjectionRegistrationDto } from './create-injection-registration.dto';
import { IsOptional } from 'custom_validation_decorators/isOptional';
import { Status } from 'injection_registration/types/status.enum';

export class UpdateInjectionRegistrationByAdminDto {
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsDateString()
  expected_injection_date: string;

  @IsOptional()
  @IsNumber()
  vaccine_id: number;

  @IsOptional()
  @IsNumber()
  vaccination_site_id: number;
}

export class UpdateInjectionRegistrationByUserDto {
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsString()
  injection_register_code: string;

  @IsOptional()
  @IsBoolean()
  vaccination_agreement: boolean;
}
