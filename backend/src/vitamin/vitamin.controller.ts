import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { VitaminService } from './vitamin.service';
import { SaveCombinationDto } from './dto/save-Combination.dto';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

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

  //유저의 조합 저장.
  @Post('/combination')
  async saveCombination(
    @Body() saveCombinationDto: SaveCombinationDto,
    @Req() request: Request,
  ) {
    const { uuid, title, total } = saveCombinationDto;
    const accesstoken = request.cookies['accesstoken'];
    this.authService.canActivate(accesstoken);
    const id = this.authService.getId(accesstoken);
    await this.vitaminService.saveCombination(uuid, id, title, total);
    await this.vitaminService.addCombiList(id, uuid, title);
    return { message: '저장완료' };
  }

  @Get('/combiList')
  async getCombiList(@Req() request: Request) {
    const accesstoken = request.cookies['accesstoken'];
    this.authService.canActivate(accesstoken);
    const id = this.authService.getId(accesstoken);
    const combiList = await this.vitaminService.getCombiList(id);
    return combiList;
  }
  @Get('/total')
  async getTotal(@Query('uuid') uuid: string) {
    const total = await this.vitaminService.getTotal(uuid);
    return total;
  }
  @Delete('/delete')
  async deleteCombi(@Query('uuid') uuid: string, @Req() request: Request) {
    const accesstoken = request.cookies['accesstoken'];
    this.authService.canActivate(accesstoken);
    const id = this.authService.getId(accesstoken);
    return await this.vitaminService.deleteCombi(uuid, id);
  }
}
