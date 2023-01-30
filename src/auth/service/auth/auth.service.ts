import { LoggedInUser } from '../../types/logged-in-user.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/typeorm/entities/user.entity';
import { comparePassword, encodePassword } from 'src/auth/bcrypt';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

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

    // if (user && comparePassword(password, user.password)) {
    //   const { password, ...userInfo } = user;
    //   return userInfo;
    // }
    if (user && password === user.password) {
      console.log('equal password');

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
    console.log(accessToken);
    return {
      accessToken,
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const hashedPassword = encodePassword(registerUserDto.password);
    await this.userRepository.insert({
      ...registerUserDto,
      password: hashedPassword,
    });
    return {
      status: 201,
      message: 'User created successfully',
    };
  }

  async logout() {
    return {
      status: '200',
      message: 'Log out successful',
    };
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { user_id: id } });
  }
}
