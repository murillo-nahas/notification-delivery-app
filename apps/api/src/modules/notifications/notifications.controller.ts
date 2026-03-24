import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { NotificationEntity } from './entities/notification.entity';
import { AuthUser, User } from '../auth/decorators/user.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() dto: CreateNotificationDto): Promise<NotificationEntity> {
    return this.notificationsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findByUserId(@User() user: AuthUser): Promise<NotificationEntity[]> {
    return this.notificationsService.findByUserId(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string, @User() user: AuthUser): Promise<NotificationEntity> {
    return this.notificationsService.markAsRead(id, user.userId);
  }
}
