import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
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
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private taskServices: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto, @GetUser() user: User) {
    this.logger.log('fetching task lister');
    return this.taskServices.getTasks(filterDto, user);
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
  createNewTasks(
    @Body() request: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskServices.create(request, user);
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
