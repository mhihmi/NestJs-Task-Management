import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  status?: TaskStatus; //optional
  search?: string; //optional
}
