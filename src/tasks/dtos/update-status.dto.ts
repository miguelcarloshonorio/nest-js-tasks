import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TasksStatus } from '../task.model';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Update task status',
    type: TasksStatus,
    enum: TasksStatus,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  status!: TasksStatus;
}
