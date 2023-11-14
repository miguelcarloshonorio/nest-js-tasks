import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  delete(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  findOne(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  create(dto: CreateTaskDto) {
    const { title, description } = dto;

    const model: Task = {
      id: randomUUID(),
      description: description,
      title: title,
      status: TasksStatus.OPEN,
      createdAt: new Date().getTime(),
    };

    this.tasks.push(model);
    return model;
  }

  getAll(): Task[] {
    return this.tasks;
  }
}
