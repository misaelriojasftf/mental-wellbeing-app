import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { LinkActivityDto } from './dto/users-activity.dto';
import { UsersActivityService } from './users-activity.service';

@Controller('users-activity')
export class UsersActivityController {
    constructor(private readonly usersActivityService: UsersActivityService) { }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    async getAllActivitiesByUser(@JwtUser() user: User) {
        return this.usersActivityService.getAllActivitiesByUser(user.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('completed')
    async listCompletedActivities(@JwtUser() user: User) {
        return this.usersActivityService.listCompletedActivities(user.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id/complete')
    async markAsCompleted(@Param('id') id: number) {
        return this.usersActivityService.markAsCompleted(id);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('link')
    async linkNewActivity(@Body() linkActivityDto: LinkActivityDto) {
        return this.usersActivityService.linkNewActivity(linkActivityDto);
    }
}
