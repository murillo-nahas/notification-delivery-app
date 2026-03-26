import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './modules/notifications/entities/notification.entity';
import { UserEntity } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { BullModule } from '@nestjs/bullmq';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      url: configService.get('DATABASE_URL'),
      entities: [UserEntity, NotificationEntity],
      synchronize: true,
    }),
    inject: [ConfigService],
  }),
  BullModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      connection: {
        host: configService.get('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
      },
    }),
    inject: [ConfigService],
  }),
    AuthModule,
    NotificationsModule,
    UsersModule,
  ],
})
export class AppModule { }
