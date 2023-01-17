import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ unique: true })
  identificationCard: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column()
  birthday: string;

  @Column()
  gender: string;

  @Column()
  wardId: string;
}
