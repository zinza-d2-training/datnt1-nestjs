import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { ForgotPasswordController } from './controller/forgot_password/forgot_password.controller';
import { ForgotPasswordService } from './service/forgot_password/forgot_password.service';
import { User } from 'typeorm/entities/user.entity';
import { jwtConstants } from 'auth/constants';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: +process.env.PORT_MAIL,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
      verifyOptions: { ignoreExpiration: false },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
