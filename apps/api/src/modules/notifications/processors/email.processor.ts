import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from "bullmq";
import { NotificationEntity, NotificationStatus } from "../entities/notification.entity";
import { NotificationsService } from "../notifications.service";

@Processor('email')
export class EmailProcessor extends WorkerHost {
  constructor(private readonly notificationsService: NotificationsService) {
    super();
  }

  async process(job: Job<NotificationEntity>): Promise<void> {
    const notification = job.data;

    await this.notificationsService.updateStatus(notification.id, NotificationStatus.PROCESSING);

    console.log(`Sending email to ${notification.userId}`);

    await this.notificationsService.updateStatus(notification.id, NotificationStatus.DELIVERED);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<NotificationEntity>) {
    this.notificationsService.updateStatus(job.data.id, NotificationStatus.FAILED);
  }
}