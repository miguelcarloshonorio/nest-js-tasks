import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTaskDto {
  @ApiProperty({ description: 'Task Title', type: String })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ description: 'Task Desctiption', type: String })
  @IsNotEmpty()
  @IsString()
  description!: string;
}
