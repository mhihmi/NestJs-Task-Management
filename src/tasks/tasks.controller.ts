import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  // 1st method
  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }

  // 2nd method more strict on incoming datas
  @Post()
  async createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Task> {
    return this.tasksService.createTask(title, description);
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
