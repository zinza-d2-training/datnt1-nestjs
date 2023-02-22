import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { InjectionRegistration } from './injection_registration.entity';
import { Ward } from './ward.entity';

@Entity()
export class VaccinationSite {
  @PrimaryGeneratedColumn()
  vaccination_site_id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  leader: string;

  @Column()
  number_of_tables: number;

  @Column({})
  ward_id: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  update_at: Date;

  @Column({ type: 'timestamp' })
  deleted_at: Date;

  @ManyToOne(() => Ward, (ward) => ward.vaccination_sites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;

  @OneToMany(
    () => InjectionRegistration,
    (injection_registration) => injection_registration.vaccination_site,
  )
  injection_registrations: InjectionRegistration[];
}
