import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InjectionRegistration } from './injection_registration.entity';

@Entity('priority_group')
export class PriorityGroup {
  @PrimaryGeneratedColumn()
  priority_group_id: number;

  @Column()
  description: string;

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

  @OneToMany(
    () => InjectionRegistration,
    (injectionRegistration) => injectionRegistration.priority_group,
  )
  injection_registrations: InjectionRegistration[];
}
