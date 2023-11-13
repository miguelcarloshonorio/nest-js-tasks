import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { Tasks } from './tasks';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [Tasks, TasksService],
})
export class TasksModule {}
