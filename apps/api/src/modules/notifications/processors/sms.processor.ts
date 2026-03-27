import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationEntity, NotificationStatus } from '../entities/notification.entity';
import { NotificationsService } from '../notifications.service';
import { Twilio } from 'twilio';
import { UsersService } from '@/modules/users/users.service';
import { ConfigService } from '@nestjs/config';

@Processor('sms')
export class SmsProcessor extends WorkerHost {
  private readonly client: Twilio;

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super();

    this.client = new Twilio(
      this.configService.get('TWILIO_ACCOUNT_SID'),
      this.configService.get('TWILIO_AUTH_TOKEN'),
    );
  }

  async process(job: Job<NotificationEntity>): Promise<void> {
    const notification = job.data;

    await this.notificationsService.updateStatus(notification.id, NotificationStatus.PROCESSING);

    const user = await this.usersService.findById(notification.userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.phoneNumber) {
      throw new Error('User has no phone number');
    }

    await this.client.messages.create({
      from: this.configService.get('TWILIO_PHONE_NUMBER'),
      to: user.phoneNumber,
      body: notification.message,
    });

    await this.notificationsService.updateStatus(notification.id, NotificationStatus.DELIVERED);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<NotificationEntity>) {
    this.notificationsService.updateStatus(job.data.id, NotificationStatus.FAILED);
  }
}
