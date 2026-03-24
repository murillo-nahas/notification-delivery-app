import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationEntity, NotificationStatus } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) { }

  async create(dto: CreateNotificationDto): Promise<NotificationEntity> {
    const notification = this.notificationRepository.create({
      userId: dto.userId,
      channel: dto.channel,
      message: dto.message,
      status: NotificationStatus.PENDING,
    });

    return this.notificationRepository.save(notification);
  }

  async findByUserId(userId: string): Promise<NotificationEntity[]> {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string, userId: string): Promise<NotificationEntity> {
    const notification = await this.notificationRepository.findOne({
      where: { id, userId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.readAt = new Date();

    return await this.notificationRepository.save(notification);
  }
}
