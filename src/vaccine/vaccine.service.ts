import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { Vaccine } from 'typeorm/entities/vaccine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(Vaccine) private vaccineRepository: Repository<Vaccine>,
  ) {}

  create(createVaccineDto: CreateVaccineDto) {
    return 'This action adds a new vaccine';
  }

  async findAll() {
    const res = await this.vaccineRepository.find();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} vaccine`;
  }

  update(id: number, updateVaccineDto: UpdateVaccineDto) {
    return `This action updates a #${id} vaccine`;
  }

  remove(id: number) {
    return `This action removes a #${id} vaccine`;
  }
}
