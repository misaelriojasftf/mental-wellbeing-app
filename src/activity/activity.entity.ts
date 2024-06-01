import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserActivity } from '../users-activity/users-activity.entity';
import { ActivityCategory } from './activity.enum';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ActivityCategory,
    default: ActivityCategory.RELAXATION,
  })
  category: ActivityCategory;

  @Column()
  duration: number;

  @Column()
  difficulty: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => UserActivity, userActivity => userActivity.activity)
  userActivities: UserActivity[];
}
