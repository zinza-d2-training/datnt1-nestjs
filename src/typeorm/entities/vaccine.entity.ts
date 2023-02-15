import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InjectionRegistration } from './injection_registration.entity';

@Entity('vaccine')
export class Vaccine {
  @PrimaryGeneratedColumn()
  vaccine_id: number;

  @Column()
  name: string;

  @Column()
  lot_number: string;

  @Column({ type: 'timestamp' })
  create_at: Date;

  @Column({ type: 'timestamp' })
  update_at: Date;

  @Column({ type: 'timestamp' })
  delete_at: Date;

  @OneToMany(
    () => InjectionRegistration,
    (injection_registration) => injection_registration.vaccine,
  )
  injection_registrations: InjectionRegistration[];
}
