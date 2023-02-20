import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { VaccinationSite } from 'typeorm/entities/vaccination_site.entity';
import { SiteSearchFilterDto } from 'vaccination_site/dto/site_search_filter.dto';
import { SiteSearchKeyDto } from 'vaccination_site/dto/site_search_key.dto';
import { UpdateVaccinationSiteDto } from 'vaccination_site/dto/update_vaccination_site.dto';
import { VaccinationSiteDto } from 'vaccination_site/dto/vaccination_site.dto';
import { VaccinationSiteInfoDto } from 'vaccination_site/dto/vaccination_site_info.dto';

@Injectable()
export class VaccinationSiteService {
  constructor(
    @InjectRepository(VaccinationSite)
    private readonly vaccinationSiteRepository: Repository<VaccinationSite>,
  ) {}

  async getVaccinationSites(searchFilter: SiteSearchFilterDto) {
    if (searchFilter.province_id === 'undefined') {
      const result = await this.vaccinationSiteRepository.find({
        relations: { ward: { district: { province: true } } },
      });

      return result.map((site) => {
        return VaccinationSiteInfoDto.fromDomain(site);
      });
    }

    if (searchFilter.district_id === 'undefined') {
      const result: VaccinationSite[] =
        await this.vaccinationSiteRepository.find({
          relations: { ward: { district: { province: true } } },
          where: {
            ward: {
              district: {
                province: { province_id: +searchFilter.province_id },
              },
            },
          },
        });

      return result.map((site) => {
        return VaccinationSiteInfoDto.fromDomain(site);
      });
    }

    if (searchFilter.ward_id !== 'undefined') {
      const result: VaccinationSite[] =
        await this.vaccinationSiteRepository.find({
          relations: { ward: { district: { province: true } } },
          where: {
            ward: {
              district: { district_id: +searchFilter.district_id },
            },
          },
        });

      return result.map((site) => {
        return VaccinationSiteInfoDto.fromDomain(site);
      });
    }

    const result: VaccinationSite[] = await this.vaccinationSiteRepository.find(
      {
        relations: { ward: { district: { province: true } } },
        where: {
          ward: { ward_id: +searchFilter.ward_id },
        },
      },
    );

    return result.map((site) => {
      return VaccinationSiteInfoDto.fromDomain(site);
    });
  }

  async createVaccinationSite(vaccinationSiteDto: VaccinationSiteDto) {
    return await this.vaccinationSiteRepository.insert(vaccinationSiteDto);
  }

  async getVaccinationSitesByKey(searchKeyDto: SiteSearchKeyDto) {
    const { name, address } = searchKeyDto;

    const result: VaccinationSite[] = await this.vaccinationSiteRepository.find(
      {
        relations: { ward: { district: { province: true } } },
        where: { name: Like(`%${name}%`), address: Like(`%${address}%`) },
      },
    );

    return result.map((site) => {
      return VaccinationSiteInfoDto.fromDomain(site);
    });
  }

  async updateVaccinationSite(
    vaccination_site_id: number,
    updateVaccinationSiteDto: UpdateVaccinationSiteDto,
  ) {
    await this.vaccinationSiteRepository.update(
      { vaccination_site_id },
      updateVaccinationSiteDto,
    );

    const result = await this.vaccinationSiteRepository.find({
      relations: { ward: { district: { province: true } } },
    });

    return result.map((site) => {
      return VaccinationSiteInfoDto.fromDomain(site);
    });
  }
}
