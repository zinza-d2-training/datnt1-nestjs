import { Controller } from '@nestjs/common';
import { Post, Get, Query, Body } from '@nestjs/common';

import { UserEmailDto } from 'forgot_password/dto/user-email.dto';
import { ForgotPasswordService } from 'forgot_password/service/forgot_password/forgot_password.service';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  @Post()
  async getForgotPassword(@Body() userEmailDto: UserEmailDto) {
    return await this.forgotPasswordService.forgotPassword(userEmailDto);
  }

  @Get('reset-password')
  async resetPassword(@Query('token') token: string) {
    return await this.forgotPasswordService.resetPassword(token);
  }
}
