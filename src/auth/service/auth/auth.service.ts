import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggedInUser } from 'auth/types/logged-in-user.interface';
import { Repository } from 'typeorm';

import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { comparePassword, encodePassword } from 'auth/bcrypt';
import { RegisterUserDto } from 'auth/dto/register-user.dto';
import { UserInfo } from 'auth/types/user-info.interface';
import { User } from 'typeorm/entities/user.entity';
import { UserInfoDto } from 'auth/dto/user-info.dto';

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
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    try {
      const { email } = registerUserDto;
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        const hashedPassword = encodePassword(registerUserDto.password);
        await this.userRepository.insert({
          ...registerUserDto,
          password: hashedPassword,
        });
      } else {
        throw new Error();
      }

      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error', {
        cause: new Error(error),
      });
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
      const userInfo = await this.userRepository.findOne({
        where: { user_id: user.user_id },
        relations: { ward: { district: { province: true } } },
      });

      return UserInfoDto.fromDomain(userInfo);
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error', {
        cause: new Error(),
      });
    }
  }
}
