import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dtos';
import { GetTaskFilterDto } from './dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskServices: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto) {
    // if (Object.keys(filterDto).length) {
    //   return this.taskServices.getTasksWithFilters(filterDto);
    // }

    // return this.taskServices.getAll();
    return this.taskServices.getTasks(filterDto);
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
  createNewTasks(@Body() request: CreateTaskDto): Promise<Task> {
    return this.taskServices.create(request);
  }

  @Get(':uuid')
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.taskServices.findOne(uuid);
  }

  @Delete(':uuid')
  delete(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.taskServices.delete(uuid);
  }

  @Patch(':uuid/status')
  updateStatus(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() body: UpdateTaskStatusDto,
  ) {
    const { status } = body;
    return this.taskServices.updateStatus(uuid, status);
  }
}
