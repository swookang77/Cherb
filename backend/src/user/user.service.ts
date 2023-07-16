import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findUser(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
  async isExistId(id: string): Promise<boolean> {
    const isExistId = await this.findUser(id);
    if (isExistId) return true;
    else return false;
  }
  create(id: string, password: string, email: string): User {
    const user = new User();
    user.id = id;
    user.password = password;
    user.email = email;
    return user;
  }
  async checkUser(id: string, password: string): Promise<boolean> {
    const user = await this.findUser(id);
    if (password === user.password) return true;
    else return false;
  }
  async save(user: User): Promise<void> {
    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        'Failed to create User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return;
  }
}
