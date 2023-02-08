import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
