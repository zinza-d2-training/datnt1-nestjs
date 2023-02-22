import {
  Controller,
  Get,
  Query,
  Post,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { UpdateVaccinationSiteDto } from 'vaccination_site/dto/update_vaccination_site.dto';
import { VaccinationSiteService } from 'vaccination_site/service/vaccination_site/vaccination_site.service';
import { SiteSearchFilterDto } from 'vaccination_site/dto/site_search_filter.dto';
import { VaccinationSiteDto } from 'vaccination_site/dto/vaccination_site.dto';
import { SiteSearchKeyDto } from 'vaccination_site/dto/site_search_key.dto';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Roles } from 'auth/custom_decorators/role.decorator';
import { Role } from 'auth/types/role.enum';

@Controller('vaccination-site')
export class VaccinationSiteController {
  constructor(private vaccinationSiteService: VaccinationSiteService) {}

  @Get()
  async getVaccinationSites(@Query() searchFilter: SiteSearchFilterDto) {
    return await this.vaccinationSiteService.getVaccinationSites(searchFilter);
  }

  @Get('search-key')
  async getVaccinationSitesByKey(@Query() searchKey: SiteSearchKeyDto) {
    return await this.vaccinationSiteService.getVaccinationSitesByKey(
      searchKey,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createVaccinationSite(@Body() vaccinationSiteDto: VaccinationSiteDto) {
    return await this.vaccinationSiteService.createVaccinationSite(
      vaccinationSiteDto,
    );
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateVaccinationSite(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVaccinationSiteDto: UpdateVaccinationSiteDto,
  ) {
    return await this.vaccinationSiteService.updateVaccinationSite(
      id,
      updateVaccinationSiteDto,
    );
  }
}
