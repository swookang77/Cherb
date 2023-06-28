import { Controller, Get, Query } from '@nestjs/common';
import { VitaminService } from './vitamin.service';

@Controller('vitamin')
export class VitaminController {
  constructor(private vitaminService: VitaminService) {}

  @Get('/image')
  getImage(@Query('search') search: string) {
    const result = this.vitaminService.getVitaminAttr(search);
    return result;
  }
}
