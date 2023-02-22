import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PriorityGroupController } from './controller/priority_group/priority_group.controller';
import { PriorityGroupService } from './service/priority_group/priority_group.service';
import { PriorityGroup } from 'typeorm/entities/priority_group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriorityGroup])],
  controllers: [PriorityGroupController],
  providers: [PriorityGroupService],
})
export class PriorityGroupModule {}
