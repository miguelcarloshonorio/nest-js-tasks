import { Controller, Get, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  getAllTasks() {
    return [];
  }

  @Post()
  createNewTasks() {
    return {};
  }
}
