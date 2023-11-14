import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './tasks';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {
  constructor(private taskServices: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskServices.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create tasks' })
  @ApiOkResponse({ description: 'Task created successfuly', type: Task })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error or missing values (title or description)',
  })
  createNewTasks(@Body() request: CreateTaskDto) {
    return this.taskServices.create(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskServices.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskServices.delete(id);
  }
}
