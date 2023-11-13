import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  findOne(id: string) {
    return { id };
  }
  create(title: string, description: string) {
    const model: Task = {
      id: randomUUID(),
      description: description,
      title: title,
      status: TasksStatus.OPEN,
    };

    model.id = randomUUID();
    model.status = this.tasks.push(model);
    return;
  }

  getAll(): Task[] {
    return this.tasks;
  }
}
