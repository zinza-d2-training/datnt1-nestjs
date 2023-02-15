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
import { VaccinationSiteModule } from './vaccination_site/vaccination_site.module';
import { PriorityGroupModule } from './priority_group/priority_group.module';
import { InjectionRegistrationModule } from './injection_registration/injection_registration.module';
import { VaccineModule } from './vaccine/vaccine.module';

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
    VaccinationSiteModule,
    PriorityGroupModule,
    InjectionRegistrationModule,
    VaccineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
