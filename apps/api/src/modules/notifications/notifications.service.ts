import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationChannel, NotificationEntity, NotificationStatus } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    @InjectQueue('email') private emailQueue: Queue,
    @InjectQueue('sms') private smsQueue: Queue,
    @InjectQueue('push') private pushQueue: Queue,
    @InjectQueue('realtime') private realtimeQueue: Queue,
  ) { }

  async create(dto: CreateNotificationDto): Promise<NotificationEntity> {
    const notification = this.notificationRepository.create({
      userId: dto.userId,
      channel: dto.channel,
      message: dto.message,
      status: NotificationStatus.PENDING,
    });

    const saved = await this.notificationRepository.save(notification);

    const queues: Record<NotificationChannel, Queue> = {
      [NotificationChannel.EMAIL]: this.emailQueue,
      [NotificationChannel.SMS]: this.smsQueue,
      [NotificationChannel.PUSH]: this.pushQueue,
      [NotificationChannel.REALTIME]: this.realtimeQueue,
    };

    await queues[saved.channel].add('send', saved, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    });

    return saved;
  }

  async updateStatus(id: string, status: NotificationStatus): Promise<void> {
    await this.notificationRepository.update(id, { status });
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
