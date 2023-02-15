import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'auth/bcrypt';
import { Repository } from 'typeorm';

import { User } from 'typeorm/entities/user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
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
    console.log('email' in updateUserDto);
    if ('email' in updateUserDto) {
      throw new InternalServerErrorException();
    }

    if ('password' in updateUserDto) {
      const { password, ...others } = updateUserDto;
      const hashedPassword = encodePassword(password);

      return await this.userRepository.update(user?.user_id, {
        password: hashedPassword,
        ...others,
      });
    }

    return await this.userRepository.update(user?.user_id, updateUserDto);
  }
}
