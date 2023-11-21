import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TasksStatus } from '../task.status';

export class GetTaskFilterDto {
  @IsEnum(TasksStatus)
  @IsOptional()
  status?: TasksStatus;

  @IsString()
  @IsOptional()
  search?: string;
}
