import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from "bullmq";
import { NotificationEntity, NotificationStatus } from "../entities/notification.entity";
import { NotificationsService } from "../notifications.service";
import { Resend } from 'resend';
import { UsersService } from '@/modules/users/users.service';
import { ConfigService } from '@nestjs/config';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly resend: Resend;

  constructor(private readonly notificationsService: NotificationsService, private readonly configService: ConfigService, private readonly usersService: UsersService) {
    super();
    this.resend = new Resend(this.configService.get('RESEND_API_KEY'));
  }


  async process(job: Job<NotificationEntity>): Promise<void> {
    const notification = job.data;

    await this.notificationsService.updateStatus(notification.id, NotificationStatus.PROCESSING);

    const user = await this.usersService.findById(notification.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { error } = await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: user.email,
      subject: 'Notification',
      html: `<p>This is a test email from Resend to a big guy</p>`
    });

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    await this.notificationsService.updateStatus(notification.id, NotificationStatus.DELIVERED);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<NotificationEntity>) {
    this.notificationsService.updateStatus(job.data.id, NotificationStatus.FAILED);
  }
}