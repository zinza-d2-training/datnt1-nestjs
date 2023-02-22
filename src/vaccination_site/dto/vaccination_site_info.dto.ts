import { VaccinationSite } from 'typeorm/entities/vaccination_site.entity';

export class VaccinationSiteInfoDto {
  vaccination_site_id: number;
  name: string;
  address: string;
  leader: string;
  number_of_tables: number;
  ward_name: string;
  district_name: string;
  province_name: string;

  static fromDomain(site: VaccinationSite) {
    // mapping goes here
    return new VaccinationSiteInfoDto({
      vaccination_site_id: site.vaccination_site_id,
      name: site.name,
      address: site.address,
      leader: site.leader,
      number_of_tables: site.number_of_tables,
      ward_name: site.ward.name,
      district_name: site.ward.district.name,
      province_name: site.ward.district.province.name,
    });
  }

  constructor(partial: Partial<VaccinationSiteInfoDto>) {
    Object.assign(this, partial);
  }
}
