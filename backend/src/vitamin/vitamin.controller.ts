import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { VitaminService } from './vitamin.service';
import { SaveCombinationDto } from './dto/save-Combination.dto';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
// import Vitamin from './models/vitamin.model';

@Controller('vitamin')
export class VitaminController {
  constructor(
    private vitaminService: VitaminService,
    private authService: AuthService,
  ) {}

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

  @Post('/combination')
  async saveCombination(
    @Body() saveCombinationDto: SaveCombinationDto,
    @Req() request: Request,
  ) {
    console.log(saveCombinationDto);
    const accessToken = request.headers.cookie;
    console.log(accessToken);
    return;
  }
}
