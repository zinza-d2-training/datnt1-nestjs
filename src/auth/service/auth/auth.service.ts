import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { comparePassword, encodePassword } from 'src/auth/bcrypt';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { User } from 'src/typeorm/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user && comparePassword(password, user.password)) {
      const { password, ...userInfo } = user;
      return userInfo;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      user_id: user.user_id,
      role: user.role,
    };
    const accessToken = await this.jwtService.sign(payload);
    return {
      ...user,
      accessToken,
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const hashedPassword = encodePassword(registerUserDto.password);
    try {
      await this.userRepository.insert({
        ...registerUserDto,
        password: hashedPassword,
      });
      return {
        status: 201,
        message: 'User created successfully',
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
        error: error,
      };
    }
  }

  async logout() {
    return {
      status: '200',
      message: 'Log out successful',
    };
  }

  async getUserById(id: number) {
    const { password, ...userInfo } = await this.userRepository.findOne({
      where: { user_id: id },
    });
    return userInfo;
  }
}
