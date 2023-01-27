import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { District } from './district.entity';

@Entity('province')
export class Province {
  @PrimaryGeneratedColumn()
  province_id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  create_at: Date;

  @Column({ type: 'timestamp' })
  update_at: Date;

  @Column({ type: 'timestamp' })
  delete_at: Date;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];
}
