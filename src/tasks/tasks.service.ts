import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    // simpler way to do it, but we'll use ORM later..
    const { status, search } = filterDto;

    // define a temporary array to hold the result
    let tasks = await this.getAllTasks();

    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // do something with search
    // if (search) {
    //   tasks = tasks.filter((task) => {
    //     if (task.title.includes(search) || task.description.includes(search)) {
    //       return true;
    //     }
    //     return false;
    //   });
    // }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    // return final result
    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    return this.tasks.find((task) => task.id === id);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    return task;
  }
}
