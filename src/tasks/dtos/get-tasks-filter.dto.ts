import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TasksStatus } from '../task.model';

export class GetTaskFilterDto {
  @IsEnum(TasksStatus)
  @IsOptional()
  status?: TasksStatus;

  @IsString()
  search?: string;
}
