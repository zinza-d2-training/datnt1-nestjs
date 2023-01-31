import { LoggedInUser } from 'auth/types/logged-in-user.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { comparePassword, encodePassword } from 'auth/bcrypt';
import { RegisterUserDto } from 'auth/dto/register-user.dto';
import { UserInfo } from 'auth/types/user-info.interface';
import { User } from 'typeorm/entities/user.entity';
import { HttpStatus } from '@nestjs/common';
import { Role } from 'auth/types/role.enum';
import { HttpException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';

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

  async login(user: UserInfo) {
    const payload = {
      email: user.email,
      user_id: user.user_id,
      role_id: user.role_id,
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
        status: HttpStatus.CREATED,
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
      status: HttpStatus.OK,
      message: 'Log out successful',
    };
  }

  async getUserInfo(user: LoggedInUser) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = await this.userRepository.findOne({
        where: { user_id: user.user_id },
      });

      return userInfo;
    } catch (error) {
      throw new InternalServerErrorException('Something bad happened', {
        cause: new Error(error),
      });
    }
  }
}
