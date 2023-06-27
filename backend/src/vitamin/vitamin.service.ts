import { Injectable } from '@nestjs/common';
import { CreateVitaminDto } from './dto/create-vitamin.dto';
import { UpdateVitaminDto } from './dto/update-vitamin.dto';

@Injectable()
export class VitaminService {
  create(createVitaminDto: CreateVitaminDto) {
    return 'This action adds a new vitamin';
  }

  findAll() {
    return `This action returns all vitamin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vitamin`;
  }

  update(id: number, updateVitaminDto: UpdateVitaminDto) {
    return `This action updates a #${id} vitamin`;
  }

  remove(id: number) {
    return `This action removes a #${id} vitamin`;
  }
}
