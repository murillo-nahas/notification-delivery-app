import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { BullModule } from '@nestjs/bullmq';
import { EmailProcessor } from './processors/email.processor';
import { PushProcessor } from './processors/push.processor';
import { RealtimeProcessor } from './processors/realtime.processor';
import { SmsProcessor } from './processors/sms.processor';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity]),
  BullModule.registerQueue(
    { name: 'email' },
    { name: 'sms' },
    { name: 'push' },
    { name: 'realtime' },
  )
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, EmailProcessor, SmsProcessor, PushProcessor, RealtimeProcessor],
})
export class NotificationsModule { }
