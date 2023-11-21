import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TasksStatus } from './task.status';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TasksStatus;
}
