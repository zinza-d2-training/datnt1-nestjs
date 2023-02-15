import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  // IsOptional,
  IsString,
} from 'class-validator';
import { IsOptional } from 'custom_validation_decorators/isOptional';
import { InjectionSession } from 'injection_registration/types/injection-session.enum';

export class CreateInjectionRegistrationDto {
  @IsOptional()
  @IsNumberString()
  health_insurance_number: string | null;

  @IsOptional()
  @IsString()
  occupation: string;

  @IsOptional()
  @IsString()
  work_unit: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsDateString()
  expected_injection_date: string;

  @IsOptional()
  @IsEnum(InjectionSession)
  injection_session: InjectionSession;

  @IsNotEmpty()
  @IsNumber()
  priority_group_id: number;
}
