// link-activity.dto.ts
import { IsInt, Min } from 'class-validator';

export class LinkActivityDto {
  @IsInt()
  @Min(1)
  activityId: number;

  @IsInt()
  @Min(1)
  userId: number;
}
