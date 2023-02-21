import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { AuthService } from 'auth/service/auth/auth.service';

import { RegisterUserDto } from 'auth/dto/register-user.dto';
import { LocalAuthGuard } from 'auth/guards/local-auth.guard';
import { LoggedInUser } from 'auth/types/logged-in-user.interface';
import { User } from 'user/decorators/user.decorator';

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
  @Get('user-info')
  async getUserInfo(@User() user: LoggedInUser) {
    return await this.authService.getUserInfo(user);
  }
}
