import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('document')
export class Document {
  @PrimaryGeneratedColumn()
  document_id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column({ type: 'timestamp' })
  create_at: Timestamp;

  @Column({ type: 'timestamp' })
  update_at: Timestamp;

  @Column({ type: 'timestamp' })
  delete_at: Date;
}
