import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { VitaminService } from './vitamin.service';
// import Vitamin from './models/vitamin.model';

@Controller('vitamin')
export class VitaminController {
  constructor(private vitaminService: VitaminService) {}

  @Get('/image')
  getImage(@Query('search') search: string) {
    const result = this.vitaminService.getVitaminAttr(search);
    return result;
  }
  @Post('/supplement-facts')
  async getFacts(@Body() body) {
    const href = body.href;
    const supplementFacts = await this.vitaminService.getVitaminFacts(href);
    return supplementFacts;
  }
}
