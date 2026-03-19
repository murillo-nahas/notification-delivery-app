import { Controller, Get, ParseEnumPipe, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity, UserRole } from './entities/user.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(@Query('role', new ParseEnumPipe(UserRole, { optional: true })) role?: UserRole): Promise<UserEntity[]> {
    return this.usersService.findAll(role);
  }
}