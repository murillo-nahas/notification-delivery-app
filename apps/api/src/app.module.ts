import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './modules/notifications/entities/notification.entity';
import { UserEntity } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';

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
    AuthModule,
  ],
})
export class AppModule { }
