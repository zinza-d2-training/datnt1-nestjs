import { AuthService } from './../../service/auth/auth.service';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: Request) {
    console.log(123);
    // return await this.authService.login(request.body);
  }
}
