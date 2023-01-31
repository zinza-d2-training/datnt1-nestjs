import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';
import { IsIdentityCardLength } from 'custom_validation_decorators/IsIdentityCardLength';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsIdentityCardLength()
  identification_card: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsDateString()
  birthday: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsNumberString()
  ward_id: string;
}
