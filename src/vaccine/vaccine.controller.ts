import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'auth/custom_decorators/role.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Role } from 'auth/types/role.enum';
import { VaccineService } from './vaccine.service';

@Controller('vaccine')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.vaccineService.findAll();
  }
}
