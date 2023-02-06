import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Min,
  MinLength,
} from 'class-validator';
import { IsIdentityCardLength } from 'custom_validation_decorators/IsIdentityCardLength';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsIdentityCardLength({
    message:
      'identification_card must be a number string with length equal to 9 or 12 characters',
  })
  identification_card: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @IsDateString()
  birthday: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  ward_id: string;
}
