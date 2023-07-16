import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { id, password, email } = createUserDto;

    const isExistId = await this.userRepository.findOneBy({ id });
    console.log(isExistId);
    if (isExistId) throw new HttpException('id already exists', 409);
    try {
      const user = this.userRepository.create({
        id,
        password,
        email,
      });
      await this.userRepository.save(user);
      console.log('good');
    } catch (error) {
      console.log('catch');
      throw new HttpException(
        'Failed to create User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return;
  }

  findAll() {
    return `This action returns all user`;
  }

  // findOne(id: string) {
  //   return `This action returns a #${id} user`;
  // }
}
