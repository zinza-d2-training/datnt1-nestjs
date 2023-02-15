import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjectionRegistration } from 'typeorm/entities/injection_registration.entity';
import { InjectionRegistrationController } from './controller/injection_registration/injection_registration.controller';
import { InjectionRegistrationService } from './service/injection_registration/injection_registration.service';

@Module({
  imports: [TypeOrmModule.forFeature([InjectionRegistration])],
  providers: [InjectionRegistrationService],
  controllers: [InjectionRegistrationController],
})
export class InjectionRegistrationModule {}
