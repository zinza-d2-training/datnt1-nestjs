import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { InjectionRegistration } from './injection_registration.entity';
import { Role } from './role.entity';
import { Ward } from './ward.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ default: 0 })
  role_id: number;

  @Column({ unique: true })
  identification_card: string;

  @Column()
  health_insurance_number: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  reset_password_token: string;

  @Column()
  fullname: string;

  @Column()
  birthday: Date;

  @Column()
  gender: string;

  @Column()
  ward_id: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  update_at: Date;

  @Column({ type: 'timestamp' })
  deleted_at: Date;

  @ManyToOne(() => Ward, (ward) => ward.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(
    () => InjectionRegistration,
    (injection_registrations) => injection_registrations.user,
  )
  injection_registrations: InjectionRegistration[];
}
