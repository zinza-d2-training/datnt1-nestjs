import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Ward } from './ward.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ default: false })
  role_id: boolean;

  @Column({ unique: true })
  identification_card: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

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
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;
}
