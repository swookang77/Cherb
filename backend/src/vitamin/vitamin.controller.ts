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
import { VitaminAttrDto } from './dto/get-vitamin-attr.dto';
import { CombiListElem, CombinationData } from './models/vitamin.model';

@Controller('vitamin')
export class VitaminController {
  constructor(
    private vitaminService: VitaminService,
    private authService: AuthService,
  ) { }
  //유저가 검색한 비타민을 웹 스크래핑해서 응답.
  @Get('/search')
  async getImage(@Query('search') search: string): Promise<VitaminAttrDto[]> {
    const result = await this.vitaminService.getVitaminAttr(search);
    return result;
  }
  //유저가 추가한 비타민 영양성분 웹 스크래핑해서 응답
  @Get('/supplement-facts')
  async getFacts(@Query('href') href: string): Promise<object> {
    const supplementFacts = await this.vitaminService.getVitaminFacts(href);
    return supplementFacts;
  }
  //유저가 추가한 조합 저장.
  @Post('/combination')
  async saveCombination(
    @Body() saveCombinationDto: SaveCombinationDto,
    @Req() request: Request,
  ): Promise<{ message: string }> {
    const { uuid, title, vitaminList, total } = saveCombinationDto;
    const accesstoken = request.cookies['accesstoken'];
    this.authService.canActivate(accesstoken);
    const id = this.authService.getId(accesstoken);
    await this.vitaminService.saveCombination(uuid, id, title, vitaminList, total);
    await this.vitaminService.addCombiList(id, uuid, title);
    return { message: '저장완료' };
  }
  //유저가 마이페이지로 이동시 유저의 조합 리스트 응답.
  @Get('/combiList')
  async getCombiList(@Req() request: Request): Promise<CombiListElem[]> {
    const accesstoken = request.cookies['accesstoken'];
    this.authService.canActivate(accesstoken);
    const id = this.authService.getId(accesstoken);
    const combiList = await this.vitaminService.getCombiList(id);
    return combiList;
  }
  //유저가 클릭한 조합에 해당하는 total , vitaminList 응답. 
  @Get('/combination')
  async getTotal(@Query('uuid') uuid: string): Promise<CombinationData> {
    return await this.vitaminService.getCombinationData(uuid);
  }
  //유저가 삭제를 원하는 조합 삭제
  @Delete('/delete')
  async deleteCombi(@Query('uuid') uuid: string, @Req() request: Request): Promise<{ message: string }> {
    const accesstoken = request.cookies['accesstoken'];
    this.authService.canActivate(accesstoken);
    const id = this.authService.getId(accesstoken);
    return await this.vitaminService.deleteCombi(uuid, id);
  }
}
