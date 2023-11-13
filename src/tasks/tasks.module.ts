import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { Task } from './tasks';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [Task, TasksService],
})
export class TasksModule {}
