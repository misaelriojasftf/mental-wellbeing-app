import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity)
        private readonly activityRepository: Repository<Activity>,
    ) { }

    async create(createActivityDto: CreateActivityDto): Promise<Activity> {
        const newActivity = this.activityRepository.create(createActivityDto);
        return this.activityRepository.save(newActivity);
    }

    async findAll(): Promise<Activity[]> {
        return this.activityRepository.find();
    }

    async findOne(id: number): Promise<Activity> {
        return this.activityRepository.findOneBy({ id });
    }

    async update(id: number, updateActivityDto: UpdateActivityDto): Promise<Activity> {
        await this.activityRepository.update(id, updateActivityDto);
        return this.activityRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.activityRepository.delete(id);
    }
}
