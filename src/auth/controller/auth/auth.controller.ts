import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'auth/service/auth/auth.service';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';

import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { RegisterUserDto } from 'auth/dto/register-user.dto';
import { LocalAuthGuard } from 'auth/guards/local-auth.guard';

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
  async getUserById(@Request() request, @Param('id', ParseIntPipe) id: number) {
    return await this.authService.getUserById(id, request.user);
  }
}
