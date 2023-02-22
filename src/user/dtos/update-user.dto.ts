import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUser.dto';
OmitType(CreateUserDto, ['email'] as const);
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {}
