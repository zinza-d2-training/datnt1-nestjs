import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistrictModule } from './district/district.module';
import { ProvinceModule } from './province/province.module';
import { UserModule } from './user/user.module';
import { WardModule } from './ward/ward.module';
import { ConsoleModule } from '@squareboat/nest-console';

import * as dotenv from 'dotenv';
import { dataSourceOptions } from './typeorm/ormconfig';
import { AdministrativeUnitModule } from './administrative_unit/administrative_unit.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    WardModule,
    DistrictModule,
    ProvinceModule,
    AdministrativeUnitModule,
    ConsoleModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
