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
import { RolesGuard } from 'auth/guards/roles.guard';
import { Roles } from 'auth/custom_decorators/role.decorator';
import { Role } from 'auth/types/role.enum';

// @UseGuards(RolesGuard)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('user-info')
  async getUserInfo(@Request() request) {
    return await this.authService.getUserInfo(request.user);
  }
}
