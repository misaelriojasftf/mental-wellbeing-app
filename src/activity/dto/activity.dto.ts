import { IsString, IsNotEmpty, IsNumber, IsIn, IsOptional } from 'class-validator';
import { ActivityCategory } from '../activity.enum';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: ActivityCategory;

  @IsNumber()
  duration: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['easy', 'medium', 'hard']) // Validate against specific values
  difficulty: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateActivityDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  category?: ActivityCategory;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsString()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
