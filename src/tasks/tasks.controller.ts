import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { Task } from './tasks';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from './dtos';

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

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() request: UpdateTaskDto) {
    return this.taskServices.updateStatus(id, request);
  }
}
