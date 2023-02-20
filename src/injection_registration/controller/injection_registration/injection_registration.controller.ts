import {
  UpdateInjectionRegistrationByAdminDto,
  UpdateInjectionRegistrationByUserDto,
} from 'injection_registration/dto/update-injection-registration.dto';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Roles } from 'auth/custom_decorators/role.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Role } from 'auth/types/role.enum';
import { CreateInjectionRegistrationDto } from 'injection_registration/dto/create-injection-registration.dto';
import { RegisterSearchFilterDto } from 'injection_registration/dto/register-search-filter.dto';
import { InjectionRegistrationService } from 'injection_registration/service/injection_registration/injection_registration.service';

@Controller('injection-registration')
export class InjectionRegistrationController {
  constructor(
    private injectionRegistrationService: InjectionRegistrationService,
  ) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Query() searchFilter: RegisterSearchFilterDto) {
    return await this.injectionRegistrationService.findAll(searchFilter);
  }

  @Get('by-user')
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findByUserId(@Request() request) {
    return await this.injectionRegistrationService.findByUserId(request.user);
  }

  @Get(':id/view-detail-by-admin')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findByInjectionRegistrationId(@Param('id', ParseIntPipe) id: number) {
    return await this.injectionRegistrationService.findByInjectionRegistrationId(
      id,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Post()
  async create(
    @Body() createInjectionRegistrationDto: CreateInjectionRegistrationDto,
    @Request() request,
  ) {
    return await this.injectionRegistrationService.create(
      createInjectionRegistrationDto,
      request.user,
    );
  }

  @Put(':id/by-user')
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateInjectionRegistrationByUser(
    @Request() request,
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateInjectionRegistrationDto: UpdateInjectionRegistrationByUserDto,
  ) {
    return await this.injectionRegistrationService.updateInjectionRegistrationByUser(
      request.user,
      id,
      updateInjectionRegistrationDto,
    );
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateInjectionRegistrationByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateInjectionRegistrationDto: UpdateInjectionRegistrationByAdminDto,
  ) {
    return await this.injectionRegistrationService.updateInjectionRegistrationByAdmin(
      id,
      updateInjectionRegistrationDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.injectionRegistrationService.delete(id);
  }
}
