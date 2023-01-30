import { IsIdentityCardLength } from 'src/custom_validation_decorators/IsIdentityCardLength';
import {
  MinLength,
  MaxLength,
  IsEmail,
  IsNumberString,
  IsString,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

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
