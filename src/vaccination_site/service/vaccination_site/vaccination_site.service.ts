import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { VaccinationSite } from 'typeorm/entities/vaccination_site.entity';
import { SiteSearchFilterDto } from 'vaccination_site/dto/site_search_filter.dto';
import { SiteSearchKeyDto } from 'vaccination_site/dto/site_search_key.dto';
import { UpdateVaccinationSiteDto } from 'vaccination_site/dto/update_vaccination_site.dto';
import { VaccinationSiteDto } from 'vaccination_site/dto/vaccination_site.dto';
import { VaccinationSiteInfo } from 'vaccination_site/types/vaccination_site.interface';

@Injectable()
export class VaccinationSiteService {
  constructor(
    @InjectRepository(VaccinationSite)
    private readonly vaccinationSiteRepository: Repository<VaccinationSite>,
  ) {}

  async getVaccinationSites(searchFilter: SiteSearchFilterDto) {
    let result: VaccinationSite[];

    if (searchFilter.province_id !== 'undefined') {
      if (searchFilter.district_id !== 'undefined') {
        if (searchFilter.ward_id !== 'undefined') {
          // chọn cả 3 tiêu chí
          result = await this.vaccinationSiteRepository.find({
            relations: { ward: { district: { province: true } } },
            where: {
              ward: { ward_id: +searchFilter.ward_id },
            },
          });
        } else {
          //chỉ chọn province và district, không chọn ward =>
          result = await this.vaccinationSiteRepository.find({
            relations: { ward: { district: { province: true } } },
            where: {
              ward: {
                district: { district_id: +searchFilter.district_id },
              },
            },
          });

          result;
        }
      } else {
        // chỉ chọn privovince
        result = await this.vaccinationSiteRepository.find({
          relations: { ward: { district: { province: true } } },
          where: {
            ward: {
              district: {
                province: { province_id: +searchFilter.province_id },
              },
            },
          },
        });

        result;
      }
    } else {
      //không chọn gì => show all
      result = await this.vaccinationSiteRepository.find({
        relations: { ward: { district: { province: true } } },
      });
    }

    return result.map((site) => {
      return {
        vaccination_site_id: site.vaccination_site_id,
        name: site.name,
        address: site.address,
        leader: site.leader,
        number_of_tables: site.number_of_tables,
        ward_name: site.ward.name,
        district_name: site.ward.district.name,
        province_name: site.ward.district.province.name,
      } as VaccinationSiteInfo;
    });
  }

  async createVaccinationSite(vaccinationSiteDto: VaccinationSiteDto) {
    const vaccinationSite =
      this.vaccinationSiteRepository.create(vaccinationSiteDto);

    return await this.vaccinationSiteRepository.save(vaccinationSite);
  }

  async getVaccinationSitesByKey(searchKeyDto: SiteSearchKeyDto) {
    let result: VaccinationSite[];
    const { name, address } = searchKeyDto;

    if (!name && !address) {
      result = await this.vaccinationSiteRepository.find({
        relations: { ward: { district: { province: true } } },
      });
    } else if (name && !address) {
      result = await this.vaccinationSiteRepository.find({
        relations: { ward: { district: { province: true } } },
        where: [{ name: Like(`%${name}%`) }],
      });
    } else if (!name && address) {
      result = await this.vaccinationSiteRepository.find({
        relations: { ward: { district: { province: true } } },
        where: [{ address: Like(`%${address}%`) }],
      });
    } else {
      result = await this.vaccinationSiteRepository.find({
        relations: { ward: { district: { province: true } } },
        where: { name: Like(`%${name}%`), address: Like(`%${address}%`) },
      });
    }

    return result.map((site) => {
      return {
        vaccination_site_id: site.vaccination_site_id,
        name: site.name,
        address: site.address,
        leader: site.leader,
        number_of_tables: site.number_of_tables,
        ward_name: site.ward.name,
        district_name: site.ward.district.name,
        province_name: site.ward.district.province.name,
      } as VaccinationSiteInfo;
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
      return {
        vaccination_site_id: site.vaccination_site_id,
        name: site.name,
        address: site.address,
        leader: site.leader,
        number_of_tables: site.number_of_tables,
        ward_name: site.ward.name,
        district_name: site.ward.district.name,
        province_name: site.ward.district.province.name,
      } as VaccinationSiteInfo;
    });
  }
}
