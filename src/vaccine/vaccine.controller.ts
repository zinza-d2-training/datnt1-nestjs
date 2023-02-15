import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { Roles } from 'auth/custom_decorators/role.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Role } from 'auth/types/role.enum';

@Controller('vaccine')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Post()
  create(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.create(createVaccineDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.vaccineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaccineDto: UpdateVaccineDto) {
    return this.vaccineService.update(+id, updateVaccineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccineService.remove(+id);
  }
}
