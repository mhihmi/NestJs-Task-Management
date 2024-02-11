import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
// import { v4 as uuid } from 'uuid'; // Without TypeORM

@Injectable()
export class TasksService {
  // With TypeORM //
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    // const found = await this.taskRepository.findOne({ id: id }); //or
    const found = await this.taskRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not Found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(task);
    return task;
  }

  // Without TypeORM //
  // private tasks: Task[] = [];
  // async getAllTasks(): Promise<Task[]> {
  //   return this.tasks;
  // }
  // async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
  //   // simpler way to do it, but we'll use ORM later..
  //   const { status, search } = filterDto;
  //   // define a temporary array to hold the result
  //   let tasks = await this.getAllTasks();
  //   // do something with status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   // do something with search
  //   // if (search) {
  //   //   tasks = tasks.filter((task) => {
  //   //     if (task.title.includes(search) || task.description.includes(search)) {
  //   //       return true;
  //   //     }
  //   //     return false;
  //   //   });
  //   // }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   // return final result
  //   return tasks;
  // }

  // async deleteTask(id: string): Promise<void> {
  //   const found = await this.getTaskById(id); // for error handler
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id); // not best option but we'll use ORM later
  // }
  // async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  //   const task = await this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
