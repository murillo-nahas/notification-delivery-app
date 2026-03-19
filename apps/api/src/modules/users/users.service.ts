import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(data: { name: string; email: string; passwordHash: string }): Promise<UserEntity> {
    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  async findAll(role?: UserRole): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: role ? { role } : {},
      select: ['id', 'name', 'email', 'role', 'createdAt'],
    });
  }
}
