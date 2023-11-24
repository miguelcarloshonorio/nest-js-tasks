import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus } from './task.status';
import { CreateTaskDto } from './dtos';
import { GetTaskFilterDto } from './dtos/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async delete(id: string): Promise<boolean> {
    return (await this.tasksRepository.delete(id)).affected > 0;
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

  async create(dto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = dto;

    const model: Task = {
      description: description,
      title: title,
      status: TasksStatus.OPEN,
      user,
    };

    return await this.tasksRepository.save(model);
  }

  async updateStatus(id: string, status: TasksStatus) {
    this.tasksRepository.update(id, {
      status,
    });
  }

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const query = this.tasksRepository
      .createQueryBuilder('tasks')
      .where('tasks.userId = :id', { id: user.id });

    const { search, status } = filterDto;

    if (status) {
      query.where({
        status,
      });
    }

    if (search) {
      // do some stuff
      query.andWhere(
        '(LOWER(task.description) LIKE :search OR LOWER(task.description) LIKE :search)',
        { search: `%${search.toLocaleLowerCase()}%` },
      );
    }
    return query.getMany();
  }
}
