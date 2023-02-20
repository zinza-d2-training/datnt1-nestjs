import { InjectionRegistration } from 'typeorm/entities/injection_registration.entity';

export class RegisterInfoDto {
  injection_registration_id: number;
  fullname: string;
  identification_card: string;
  expected_injection_date: Date;
  vaccine_name: string | null;
  lot_number: string;
  vaccination_site_name: string | null;
  status: string;

  static fromDomain(res: InjectionRegistration) {
    // mapping goes here
    return new RegisterInfoDto({
      injection_registration_id: res.injection_registration_id,
      fullname: res.user?.fullname,
      identification_card: res.user?.identification_card,
      expected_injection_date: res.expected_injection_date,
      vaccine_name: res.vaccine?.name,
      lot_number: res.vaccine?.lot_number,
      vaccination_site_name: res.vaccination_site?.name,
      status: res.status,
    });
  }

  constructor(partial: Partial<RegisterInfoDto>) {
    Object.assign(this, partial);
  }
}
