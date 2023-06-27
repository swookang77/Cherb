import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VitaminService } from './vitamin.service';
import { CreateVitaminDto } from './dto/create-vitamin.dto';
import { UpdateVitaminDto } from './dto/update-vitamin.dto';

@Controller('vitamin')
export class VitaminController {
  constructor(private readonly vitaminService: VitaminService) {}

  @Post()
  create(@Body() createVitaminDto: CreateVitaminDto) {
    return this.vitaminService.create(createVitaminDto);
  }

  @Get()
  findAll() {
    return this.vitaminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vitaminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVitaminDto: UpdateVitaminDto) {
    return this.vitaminService.update(+id, updateVitaminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vitaminService.remove(+id);
  }
}
