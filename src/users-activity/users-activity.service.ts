import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/activity/activity.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LinkActivityDto } from './dto/users-activity.dto';
import { UserActivity } from './users-activity.entity';

@Injectable()
export class UsersActivityService {
    constructor(
        @InjectRepository(UserActivity)
        private readonly userActivityRepository: Repository<UserActivity>,
        @InjectRepository(Activity)
        private readonly activityRepository: Repository<Activity>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async markAsCompleted(userActivityId: number): Promise<void> {
        await this.userActivityRepository.update({ id: userActivityId }, { completed: true, completedAt: new Date() })
    }

    async listCompletedActivities(userId: number): Promise<UserActivity[]> {
        return this.userActivityRepository
            .find({ where: { user: { id: userId }, completed: true }, relations: ['activity'] });
    }

    async getAllActivitiesByUser(userId: number): Promise<UserActivity[]> {
        return this.userActivityRepository.find({ where: { user: { id: userId } }, relations: ['activity'] });
    }

    async linkNewActivity(linkActivityDto: LinkActivityDto): Promise<void> {
        const { activityId, userId } = linkActivityDto;

        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('user does not exist');
        }

        const activity = await this.activityRepository.findOneBy({ id: activityId });
        if (!activity) {
            throw new NotFoundException(`activity ${activityId} does not exist`);
        }

        const userActivity = new UserActivity();
        userActivity.user = user;
        userActivity.activity = activity;

        await this.userActivityRepository.save(userActivity);
    }
}
