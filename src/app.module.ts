import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from '@squareboat/nest-console';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from './typeorm/ormconfig';
import { AdministrativeUnitModule } from './administrative_unit/administrative_unit.module';
import { AuthModule } from './auth/auth.module';
import { ForgotPasswordModule } from './forgot_password/forgot_password.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AdministrativeUnitModule,
    ConsoleModule,
    AuthModule,
    ForgotPasswordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
