import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import { VitaminAttrDto } from './dto/get-vitamin-attr.dto';

@Injectable()
export class VitaminService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger('YYG');
  async getVitaminAttr(search: string): Promise<VitaminAttrDto[]> {
    const searchUrl = `https://kr.iherb.com/search?kw=${search}`;
    //iherb에 검색.
    const data = await firstValueFrom(
      this.httpService.get(searchUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'getImage axios error';
        }),
      ),
    );
    //html 스크래핑.
    const html = data.data;
    const $ = cheerio.load(html);
    const vitaminSelector =
      '#FilteredProducts > div.panel-stack.defer-block > div:nth-child(2) > div.products.product-cells.clearfix > div.product-cell-container > div.product.ga-product > div.product-inner.product-inner-wide > div.absolute-link-wrapper';
    const vitaminAttr = [];
    $(vitaminSelector).each((idx, node) => {
      const href = $(node).find('a').attr('href');
      const title = $(node).find('a').attr('title');
      const img = $(node).find('img').attr('src');
      //img가 undefined일때가 있음.. 이 부분은 해결필요.
      if (img) {
        vitaminAttr.push({
          href,
          title,
          img,
        });
      }
    });
    return vitaminAttr;
  }
}
