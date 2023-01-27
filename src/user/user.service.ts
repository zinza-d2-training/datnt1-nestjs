import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
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

  async updateUser(id: number, createUserDto: CreateUserDto) {
    await this.userRepository.update(id, createUserDto);
  }
}
