import { JwtAuthGuard } from './../../guards/jwt-auth.guard';
import { AuthService } from 'src/auth/service/auth/auth.service';
import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Body,
  Param,
} from '@nestjs/common';

import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return await this.authService.login(request.user);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }

  @Get('logout')
  async logout() {
    return await this.authService.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const { password, ...userInfo } = await this.authService.getUserById(id);
    return userInfo;
  }
}
