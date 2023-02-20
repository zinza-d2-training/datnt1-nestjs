import { Exclude } from 'class-transformer';

import { User } from 'typeorm/entities/user.entity';

export class UserInfoDto {
  user_id: number;
  role_id: number;
  identification_card: string;
  email: string;
  fullname: string;
  birthday: Date;
  gender: string;
  ward_name: string;
  district_name: string;
  province_name: string;

  @Exclude()
  password: string;

  @Exclude()
  reset_password_token: string;

  static fromDomain(user: User) {
    return new UserInfoDto({
      user_id: user?.user_id,
      role_id: user?.role_id,
      identification_card: user?.identification_card,
      email: user?.email,
      fullname: user?.fullname,
      birthday: user?.birthday,
      gender: user?.gender,
      ward_name: user?.ward.name,
      district_name: user?.ward.district.name,
      province_name: user?.ward.district.province.name,
    });
  }

  constructor(partial: Partial<UserInfoDto>) {
    Object.assign(this, partial);
  }
}
