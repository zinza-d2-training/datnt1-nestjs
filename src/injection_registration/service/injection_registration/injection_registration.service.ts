import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectRepository } from '@nestjs/typeorm';

import { LoggedInUser } from 'auth/types/logged-in-user.interface';
import { CreateInjectionRegistrationDto } from 'injection_registration/dto/create-injection-registration.dto';
import { RegisterInfoDto } from 'injection_registration/dto/register-info.dto';
import { RegisterResultDto } from 'injection_registration/dto/register-result.dto';
import { RegisterSearchFilterDto } from 'injection_registration/dto/register-search-filter.dto';
import {
  UpdateInjectionRegistrationByAdminDto,
  UpdateInjectionRegistrationByUserDto,
} from 'injection_registration/dto/update-injection-registration.dto';
import { randomRegisterCode } from 'injection_registration/random_register_code';
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
    const { fullname, identification_card } = searchFilter;

    const result = await this.injectionRegistrationRepository.find({
      relations: { user: true, vaccination_site: true, vaccine: true },
      where: {
        user: {
          fullname: Like(`%${fullname}%`),
          identification_card: Like(`%${identification_card}%`),
        },
      },
    });

    const registerInfo: RegisterInfoDto[] = result.map((res) => {
      return RegisterInfoDto.fromDomain(res);
    });

    return registerInfo;
  }

  async findByUserId(user: LoggedInUser) {
    try {
      const injectionRegistrationList =
        await this.injectionRegistrationRepository.find({
          where: { user_id: user?.user_id },
          relations: { user: true, vaccination_site: true, vaccine: true },
        });

      const registerResult: RegisterResultDto[] = injectionRegistrationList
        ?.filter(
          (injectionRegistrationList) =>
            injectionRegistrationList.status !== Status.PENDING,
        )
        .map((injectionRegistrationList) => {
          return RegisterResultDto.fromDomain(injectionRegistrationList);
        });

      return registerResult;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findByInjectionRegistrationId(user) {
    try {
      return await this.injectionRegistrationRepository.find({
        where: { injection_registration_id: user?.user_id },
      });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async create(
    createInjectionRegistrationDto: CreateInjectionRegistrationDto,
    user: LoggedInUser,
  ) {
    try {
      await this.injectionRegistrationRepository.insert({
        user_id: user.user_id,
        ...createInjectionRegistrationDto,
        status: Status.PENDING,
      });

      const newRegistration =
        await this.injectionRegistrationRepository.findOne({
          where: { user_id: user.user_id },
          order: { create_at: 'DESC' },
        });

      return newRegistration;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async updateInjectionRegistrationByUser(
    user: LoggedInUser,
    id: number,
    updateInjectionRegistrationByUserDto: UpdateInjectionRegistrationByUserDto,
  ) {
    try {
      const injection_register_code = randomRegisterCode(16);
      const status = Status.SUCCESS;

      await this.injectionRegistrationRepository.update(
        {
          injection_registration_id: id,
          user_id: user.user_id,
        },
        {
          status,
          injection_register_code,
          ...updateInjectionRegistrationByUserDto,
        },
      );

      return await this.injectionRegistrationRepository.findOne({
        where: { injection_registration_id: id },
      });
    } catch (err) {
      throw new InternalServerErrorException();
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

      const registerInfo: RegisterInfoDto[] = result.map((res) => {
        return RegisterInfoDto.fromDomain(res);
      });

      return registerInfo;
    } catch (err) {
      throw new InternalServerErrorException();
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
