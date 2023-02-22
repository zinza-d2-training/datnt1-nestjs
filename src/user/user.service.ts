import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'auth/bcrypt';
import { Repository } from 'typeorm';

import { User } from 'typeorm/entities/user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserInfoDto } from 'auth/dto/user-info.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ user_id: id });
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }

  async addOne(createUserDto: CreateUserDto) {
    this.userRepository.create(createUserDto);

    return this.userRepository.save(createUserDto);
  }

  async updateUser(user, updateUserDto: UpdateUserDto) {
    // if ('email' in updateUserDto) {
    //   throw new UnauthorizedException();
    // }

    if ('password' in updateUserDto) {
      const { password } = updateUserDto;
      const hashedPassword = encodePassword(password);

      updateUserDto.password = hashedPassword;
    }

    await this.userRepository.update(user?.user_id, updateUserDto);

    const updatedUser: User = await this.userRepository.findOne({
      where: { user_id: user.user_id },
      relations: { ward: { district: { province: true } } },
    });

    return UserInfoDto.fromDomain(updatedUser);
  }

  async updateByUserId(id: number, updateUserDto: UpdateUserDto) {
    if ('password' in updateUserDto) {
      const { password } = updateUserDto;
      const hashedPassword = encodePassword(password);

      updateUserDto.password = hashedPassword;
    }

    return await this.userRepository.update({ user_id: id }, updateUserDto);
  }
}
