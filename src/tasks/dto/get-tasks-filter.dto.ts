import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  // status?: TaskStatus; //optional but wont work at runtime using ts only

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus; //optional but wont work at runtime

  @IsOptional()
  @IsString()
  search?: string; //optional
}
