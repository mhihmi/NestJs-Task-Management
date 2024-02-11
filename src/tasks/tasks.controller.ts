import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // With TypeORM //

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id); // return is permitted here as if void
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    // We can destructuring or pass the updateTaskStatusDto to the service too
    const { status } = updateTaskStatusDto;

    return this.tasksService.updateTaskStatus(id, status);
  }

  // Without TypeORM //
  // // http://localhost:3000/tasks
  // // @Get()
  // // async getAllTasks(): Promise<Task[]> {
  // //   return this.tasksService.getAllTasks();
  // // }
  // // adding filters from query:
  // @Get()
  // async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
  //   if (Object.keys(filterDto).length) {
  //     // if we have any filters defined, call taskService.getTasksWithFilters
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     // otherwise, just get all tasks
  //     return this.tasksService.getAllTasks();
  //   }
  // }
}

///////////////////////////////////////////////////////////////////////
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
