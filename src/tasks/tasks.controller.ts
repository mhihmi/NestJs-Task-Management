import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // http://localhost:3000/tasks
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  // http://localhost:3000/tasks/j1g251b16f1vb16f
  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // http://localhost:3000/tasks/j1g251b16f1vb16f
  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id); // return is permitted here as if void
  }

  // 1st method
  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }

  // 2nd method more strict on incoming datas
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
}

// @Controller('tasks')
// export class TasksController {
//   constructor(private tasksService: TasksService) {}
// }

// Same As (without helloWorld Method)

// @Controller('tasks')
// export class TasksController {
//   tasksService: TasksService;

//   constructor(tasksService: TasksService) {
//     this.tasksService = tasksService;
//   }

//   helloWorld() {
//     this.tasksService.doSomething();
//   }
// }
