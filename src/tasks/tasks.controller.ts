import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskServices: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskServices.getAll();
  }

  @Post()
  createNewTasks(@Body('title') title, @Body('title') description) {
    return this.taskServices.create(title, description);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskServices.findOne(id);
  }
}
