import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>
  ) { }
  async findUser(id: string): Promise<User> {
    return await this.userModel.findById({ _id: id });
  }
  async isExistId(id: string): Promise<boolean> {
    const isExistId = await this.findUser(id);
    if (isExistId) return true;
    else return false;
  }
  async checkUser(id: string, password: string): Promise<boolean> {
    const user = await this.findUser(id);
    if (password === user.password) return true;
    else return false;
  }
  async save(id: string, password: string, email: string): Promise<void> {
    try {
      const user = new this.userModel({
        _id: id,
        password,
        email,
      })
      await user.save();
    } catch (error) {
      throw new HttpException(
        'Failed to create User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return;
  }
}
