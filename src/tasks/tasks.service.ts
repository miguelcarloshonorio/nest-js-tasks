import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus } from './task.model';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dtos';
import { GetTaskFilterDto } from './dtos/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async delete(id: string) {
    return this.tasksRepository.delete(id);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const { title, description } = dto;

    const model: Task = {
      id: randomUUID(),
      description: description,
      title: title,
      status: TasksStatus.OPEN,
    };

    return await this.tasksRepository.save(model);
  }

  getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async updateStatus(id: string, status: TasksStatus) {
    this.tasksRepository.update(id, {
      status,
    });
  }

  async getTasksWithFilters(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;

    let tasks = await this.tasksRepository.find();

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
