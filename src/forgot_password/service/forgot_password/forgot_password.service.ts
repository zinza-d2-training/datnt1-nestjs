import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'auth/bcrypt';
import { UserEmailDto } from 'forgot_password/dto/user-email.dto';
import { Repository } from 'typeorm';
import { User } from 'typeorm/entities/user.entity';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private jwtService: JwtService,
    private mailerService: MailerService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async forgotPassword(userEmail: UserEmailDto) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail.email },
    });

    if (user) {
      const payload = { email: user.email };

      const token = this.jwtService.sign(payload);

      await this.userRepository.update(
        { user_id: user.user_id },
        {
          reset_password_token: token,
        },
      );

      const url = `${process.env.CLIENT_BASE_URL}/confirm-reset-password?token=${token}`;

      await this.mailerService.sendMail({
        from: process.env.MAIL_FROM,
        to: user.email,
        subject: 'Welcome to App! Confirm your Email',
        html: `Follow <a href=${url}>here</a> to confirm reset your password`,
      });

      return {
        message: 'Check your email address to reset your password',
      };
    } else {
      throw new UnauthorizedException('email not found');
    }
  }

  async resetPassword(token: string) {
    const newPassword = Math.random().toString(36).slice(-8);
    const payload = this.jwtService.verify(token);

    if (payload) {
      const user = await this.userRepository.findOne({
        where: { reset_password_token: token },
      });

      if (user) {
        const hashedPassword = encodePassword(newPassword);
        await this.userRepository.update(
          { user_id: user.user_id },
          {
            password: hashedPassword,
            reset_password_token: null,
          },
        );

        await this.mailerService.sendMail({
          from: process.env.MAIL_FROM,
          to: user.email,
          subject: 'Confirm reset password successfully',
          text: `New reset password  is: ${newPassword}`,
        });

        return {
          message: `New password reset is: ${newPassword}`,
        };
      } else {
        throw new UnauthorizedException('jwt is expired');
      }
    }
  }
}
