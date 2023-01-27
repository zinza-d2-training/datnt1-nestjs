import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { District } from './district.entity';
import { User } from './user.entity';

@Entity('ward')
export class Ward {
  @PrimaryGeneratedColumn()
  ward_id: number;

  @Column()
  name: string;

  @Column()
  district_id: number;

  @Column({ type: 'timestamp' })
  create_at: Date;

  @Column({ type: 'timestamp' })
  update_at: Date;

  @Column({ type: 'timestamp' })
  delete_at: Date;

  @ManyToOne(() => District, (district) => district.wards, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'district_id' })
  district: District;

  @OneToMany(() => User, (user) => user.ward)
  users: User[];
}
