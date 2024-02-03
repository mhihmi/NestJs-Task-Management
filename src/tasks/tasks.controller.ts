import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

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
