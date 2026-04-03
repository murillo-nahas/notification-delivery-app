import z from "zod";
import { NotificationChannel, NotificationStatus } from "../types/notification-channel.enum";

export const notificationSchema = z.object({
  userId: z.string(),
  channel: z.enum([
    NotificationChannel.EMAIL,
    NotificationChannel.SMS,
    NotificationChannel.PUSH,
    NotificationChannel.REALTIME,
  ]),
  message: z.string(),
  status: z.enum([
    NotificationStatus.DELIVERED,
    NotificationStatus.FAILED,
    NotificationStatus.PENDING,
    NotificationStatus.PROCESSING,
    NotificationStatus.QUEUED,
  ]),
  readAt: z.string(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type NotificationSchema = z.infer<typeof notificationSchema>;
