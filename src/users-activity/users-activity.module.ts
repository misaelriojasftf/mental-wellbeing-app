import { Module } from '@nestjs/common';
import { UsersActivityService } from './users-activity.service';
import { UsersActivityController } from './users-activity.controller';

@Module({
  providers: [UsersActivityService],
  controllers: [UsersActivityController]
})
export class UsersActivityModule {}
