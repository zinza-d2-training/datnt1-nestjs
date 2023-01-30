import { LoggedInUser } from '../../types/logged-in-user.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/typeorm/entities/user.entity';
import { comparePassword } from 'src/auth/bcrypt';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';

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
    console.log(user);

    // if (user && comparePassword(password, user.password)) {
    //   const { password, ...userInfo } = user;
    //   return userInfo;
    // }
    if (user && password === user.password) {
      const { password, ...userInfo } = user;
      return userInfo;
    }
    return null;
  }

  //   async login(user: any) {
  //     const payload = {
  //       email: user.email,
  //       user_id: user.user_id,
  //       role: user.role,
  //     };

  //     return {
  //       accessToken: this.jwtService.sign(payload),
  //     };
  //   }

  //   async logout() {
  //     return {
  //       status: '200',
  //       message: 'Log out successful',
  //     };
  //   }
}
