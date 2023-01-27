import { Module } from '@nestjs/common';
import { WardController } from './controller/ward/ward.controller';
import { WardService } from './service/ward/ward.service';

@Module({
  controllers: [WardController],
  providers: [WardService]
})
export class WardModule {}
