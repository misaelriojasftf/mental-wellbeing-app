import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtUser } from './user.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@JwtUser() user: User) {
        return this.userService.findById(user.id);
    }
}
