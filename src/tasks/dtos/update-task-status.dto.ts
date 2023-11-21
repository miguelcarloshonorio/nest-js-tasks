import { IsEnum } from 'class-validator';
import { TasksStatus } from '../task.status';

export class UpdateTaskStatusDto {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
