import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dtos';
import { GetTaskFilterDto } from './dtos/get-tasks-filter.dto';

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

  getAllTasks(): Task[] {
    return this.tasks;
  }

  updateStatus(id: string, status: TasksStatus) {
    const task = this.findOne(id);
    task.status = status;
    this.delete(id);
    this.tasks.push(task);
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { search, status } = filterDto;

    let tasks = this.tasks;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          task.description
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }
}
