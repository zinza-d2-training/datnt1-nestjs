import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaccine } from 'typeorm/entities/vaccine.entity';

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(Vaccine) private vaccineRepository: Repository<Vaccine>,
  ) {}

  async findAll() {
    return await this.vaccineRepository.find();
  }
}
