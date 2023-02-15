import { Controller, Get } from '@nestjs/common';
import { PriorityGroupService } from 'priority_group/service/priority_group/priority_group.service';

@Controller('priority-group')
export class PriorityGroupController {
  constructor(private priorityGroupService: PriorityGroupService) {}

  @Get()
  async getAllPriorityGroups() {
    return await this.priorityGroupService.getAllPriorityGroups();
  }
}
