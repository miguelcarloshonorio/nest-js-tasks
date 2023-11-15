import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { GetTaskFilterDto } from './dtos/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskServices: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto) {
    if (Object.keys(filterDto).length) {
      return this.taskServices.getTasksWithFilters(filterDto);
    }

    return this.taskServices.getAllTasks();
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
