import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriorityGroup } from 'typeorm/entities/priority_group.entity';

@Injectable()
export class PriorityGroupService {
  constructor(
    @InjectRepository(PriorityGroup)
    private priorityGroupRepository: Repository<PriorityGroup>,
  ) {}

  async getAllPriorityGroups() {
    return await this.priorityGroupRepository.find();
  }
}
