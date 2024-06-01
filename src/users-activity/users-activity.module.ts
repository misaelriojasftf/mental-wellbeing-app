import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/activity/activity.entity';
import { User } from 'src/user/user.entity';
import { UsersActivityController } from './users-activity.controller';
import { UserActivity } from './users-activity.entity';
import { UsersActivityService } from './users-activity.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserActivity, User, Activity])],
  providers: [UsersActivityService],
  controllers: [UsersActivityController]
})
export class UsersActivityModule { }
