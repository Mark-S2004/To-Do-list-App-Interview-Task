import { IsBoolean, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  // TODO: Change IsString to IsDate
  @IsString()
  dueDate: Date | string;
}
