import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
}
