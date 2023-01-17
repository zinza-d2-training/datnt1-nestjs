import {
  MinLength,
  MaxLength,
  IsEmail,
  IsNumberString,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsNumberString()
  @MinLength(12)
  @MaxLength(12)
  identificationCard: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  fullname: string;

  @IsDateString()
  birthday: string;

  @IsString()
  gender: string;

  @IsNumberString()
  wardId: string;
}
