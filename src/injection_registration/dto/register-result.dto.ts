import { InjectionRegistration } from 'typeorm/entities/injection_registration.entity';

export class RegisterResultDto {
  health_insurance_number: string;
  fullname: string | null;
  birthday: Date;
  gender: string;
  identification_card: string;
  status: string;
  expected_injection_date: Date;
  vaccine_name: string;
  lot_number: string;
  vaccination_site_name: string;

  static fromDomain(res: InjectionRegistration) {
    // mapping goes here
    return new RegisterResultDto({
      health_insurance_number: res.user?.health_insurance_number,
      identification_card: res.user?.identification_card,
      birthday: res.user?.birthday,
      fullname: res.user?.fullname,
      gender: res.user?.gender,
      vaccine_name: res.vaccine?.name,
      lot_number: res.vaccine?.lot_number,
      vaccination_site_name: res.vaccination_site?.name,
      expected_injection_date: res.expected_injection_date,
      status: res.status,
    });
  }

  constructor(partial: Partial<RegisterResultDto>) {
    Object.assign(this, partial);
  }
}
