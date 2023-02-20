import { PriorityGroup } from './priority_group.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Vaccine } from './vaccine.entity';
import { VaccinationSite } from './vaccination_site.entity';

@Entity('injection_registration')
export class InjectionRegistration {
  @PrimaryGeneratedColumn()
  injection_registration_id: number;

  @Column()
  priority_group_id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  vaccination_site_id: number;

  @Column({ nullable: true })
  vaccine_id: number;

  @Column()
  occupation: string;

  @Column()
  work_unit: string;

  @Column()
  address: string;

  @Column()
  expected_injection_date: Date;

  @Column()
  injection_session: string;

  @Column()
  vaccination_agreement: boolean;

  @Column()
  status: string;

  @Column()
  injection_register_code: string;

  @Column()
  injection_time: string;

  @Column({
    type: 'timestamp',
  })
  create_at: Date;

  @Column({
    type: 'timestamp',
  })
  update_at: Date;

  @Column({
    type: 'timestamp',
  })
  delete_at: Date;

  @ManyToOne(
    () => PriorityGroup,
    (priorityGroup) => priorityGroup.injection_registrations,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'priority_group_id' })
  priority_group: PriorityGroup;

  @ManyToOne(() => User, (user) => user.injection_registrations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.injection_registrations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vaccine_id' })
  vaccine: Vaccine;

  @ManyToOne(
    () => VaccinationSite,
    (vaccination_site) => vaccination_site.injection_registrations,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'vaccination_site_id' })
  vaccination_site: VaccinationSite;
}
