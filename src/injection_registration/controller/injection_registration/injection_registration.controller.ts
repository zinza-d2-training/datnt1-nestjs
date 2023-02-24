import {
  UpdateInjectionRegistrationByAdminDto,
  UpdateInjectionRegistrationByUserDto,
} from 'injection_registration/dto/update-injection-registration.dto';

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Roles } from 'auth/custom_decorators/role.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { LoggedInUser } from 'auth/types/logged-in-user.interface';
import { Role } from 'auth/types/role.enum';
import { CreateInjectionRegistrationDto } from 'injection_registration/dto/create-injection-registration.dto';
import { RegisterSearchFilterDto } from 'injection_registration/dto/register-search-filter.dto';
import { InjectionRegistrationService } from 'injection_registration/service/injection_registration/injection_registration.service';
import { User } from 'user/decorators/user.decorator';

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
  async findByUserId(@User() user: LoggedInUser) {
    return await this.injectionRegistrationService.findByUserId(user);
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
    @User() user: LoggedInUser,
  ) {
    return await this.injectionRegistrationService.create(
      createInjectionRegistrationDto,
      user,
    );
  }

  @Put(':id/by-user')
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateInjectionRegistrationByUser(
    @User() user: LoggedInUser,
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateInjectionRegistrationDto: UpdateInjectionRegistrationByUserDto,
  ) {
    return await this.injectionRegistrationService.updateInjectionRegistrationByUser(
      user,
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
}
