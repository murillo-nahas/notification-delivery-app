import { NotificationChannel } from "../entities/notification.entity";

export interface CreateNotificationDto {
  userId: string;
  channel: NotificationChannel;
  message: string;
}