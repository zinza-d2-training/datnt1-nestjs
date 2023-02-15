import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateInjectionRegistrationDto } from 'injection_registration/dto/create-injection-registration.dto';
import { RegisterSearchFilterDto } from 'injection_registration/dto/register-search-filter.dto';
import {
  UpdateInjectionRegistrationByAdminDto,
  UpdateInjectionRegistrationByUserDto,
} from 'injection_registration/dto/update-injection-registration.dto';
import { RegisterInfo } from 'injection_registration/types/register-info.interface';
import { RegisterResult } from 'injection_registration/types/register-result.interface';
import { Status } from 'injection_registration/types/status.enum';
import { Like, Repository } from 'typeorm';
import { InjectionRegistration } from 'typeorm/entities/injection_registration.entity';

@Injectable()
export class InjectionRegistrationService {
  constructor(
    @InjectRepository(InjectionRegistration)
    private injectionRegistrationRepository: Repository<InjectionRegistration>,
  ) {}

  async findAll(searchFilter: RegisterSearchFilterDto) {
    let result: InjectionRegistration[];

    const { fullname, identification_card } = searchFilter;

    if (!fullname && !identification_card) {
      result = await this.injectionRegistrationRepository.find({
        relations: { user: true, vaccination_site: true, vaccine: true },
      });
    } else if (fullname && !identification_card) {
      result = await this.injectionRegistrationRepository.find({
        relations: { user: true, vaccination_site: true, vaccine: true },
        where: [{ user: { fullname: Like(`%${fullname}%`) } }],
      });
    } else if (!fullname && identification_card) {
      result = await this.injectionRegistrationRepository.find({
        relations: { user: true, vaccination_site: true, vaccine: true },
        where: [
          {
            user: {
              identification_card: Like(`%${identification_card}%`),
            },
          },
        ],
      });
    } else {
      result = await this.injectionRegistrationRepository.find({
        relations: { user: true, vaccination_site: true, vaccine: true },
        where: {
          user: {
            fullname: Like(`%${fullname}%`),
            identification_card: Like(`%${identification_card}%`),
          },
        },
      });
    }

    const registerInfo: RegisterInfo[] = result.map((res) => {
      return {
        injection_registration_id: res.injection_registration_id,
        fullname: res.user.fullname,
        identification_card: res.user.identification_card,
        expected_injection_date: res.expected_injection_date,
        vaccine_name: res.vaccine?.name || null,
        lot_number: res.vaccine?.lot_number || null,
        vaccination_site_name: res.vaccination_site?.name || null,
        status: res.status,
      };
    });

    return registerInfo;
  }

  async findByUserId(user) {
    try {
      const res = await this.injectionRegistrationRepository.find({
        where: { user_id: user?.user_id },
        relations: { user: true, vaccination_site: true, vaccine: true },
      });

      return res?.map((res) => {
        if (res.status !== Status.PENDING) {
          return {
            health_insurance_number: res?.user?.health_insurance_number,
            fullname: res?.user?.fullname,
            birthday: res?.user?.birthday,
            gender: res?.user?.gender,
            identification_card: res?.user?.identification_card,
            status: res?.status,
            expected_injection_date: res?.expected_injection_date,
            vaccine_name: res?.vaccine?.name,
            lot_number: res?.vaccine?.lot_number,
            vaccination_site_name: res?.vaccination_site?.name,
          } as RegisterResult;
        }
      });
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async findByInjectionRegistrationId(user) {
    try {
      return await this.injectionRegistrationRepository.find({
        where: { injection_registration_id: user?.user_id },
      });
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(
    createInjectionRegistrationDto: CreateInjectionRegistrationDto,
    user,
  ) {
    try {
      const newRegistration = await this.injectionRegistrationRepository.save({
        user_id: user.user_id,
        createInjectionRegistrationDto,
      });

      return newRegistration;
    } catch (err) {
      throw new HttpException('Cannot create', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async updateInjectionRegistrationByUser(
    id: number,
    updateInjectionRegistrationByUserDto: UpdateInjectionRegistrationByUserDto,
  ) {
    try {
      let result = '';
      const characters = '0123456789';
      const charactersLength = characters.length;
      let counter = 0;

      while (counter < 16) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
      }

      const injection_register_code = result;
      const status = Status.SUCCESS;

      return await this.injectionRegistrationRepository.update(
        {
          injection_registration_id: id,
        },
        {
          status,
          injection_register_code,
          ...updateInjectionRegistrationByUserDto,
        },
      );
    } catch (err) {
      throw new HttpException(
        'Cannot update',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateInjectionRegistrationByAdmin(
    id: number,
    updateInjectionRegistrationByAdminDto: UpdateInjectionRegistrationByAdminDto,
  ) {
    try {
      await this.injectionRegistrationRepository.update(
        {
          injection_registration_id: id,
        },
        updateInjectionRegistrationByAdminDto,
      );

      const result = await this.injectionRegistrationRepository.find({
        relations: { user: true, vaccination_site: true, vaccine: true },
      });

      const registerInfo: RegisterInfo[] = result.map((res) => {
        return {
          injection_registration_id: res.injection_registration_id,
          fullname: res.user.fullname,
          identification_card: res.user.identification_card,
          expected_injection_date: res.expected_injection_date,
          vaccine_name: res.vaccine?.name || null,
          lot_number: res.vaccine?.lot_number || null,
          vaccination_site_name: res.vaccination_site?.name || null,
          status: res.status,
        };
      });

      return registerInfo;
    } catch (err) {
      throw new HttpException(
        'Cannot update',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number) {
    try {
      return await this.injectionRegistrationRepository.delete({
        injection_registration_id: id,
      });
    } catch (err) {
      throw new HttpException(
        'Cannot delete',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
