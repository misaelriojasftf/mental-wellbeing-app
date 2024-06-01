import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from '../activity/activity.entity';
import { User } from '../user/user.entity';

@Entity('users_activities')
export class UserActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userActivities)
  user: User;

  @ManyToOne(() => Activity, activity => activity.userActivities)
  activity: Activity;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date | null;
}
