import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { VitaminAttrDto } from './dto/get-vitamin-attr.dto';

@Injectable()
export class VitaminService {
  async getVitaminAttr(search: string): Promise<VitaminAttrDto[]> {
    const searchUrl = `https://kr.iherb.com/search?kw=${search}`;
    //iherb에 검색.
    const response = await axios.get(searchUrl);
    //html 스크래핑.
    const html = response.data;
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
  async getVitaminFacts(href: string) {
    //403방지 헤더.
    const config = {
      headers: {
        'User-Agent': 'insomnia/2023.2.2',
      },
    };
    const response = await axios.get(href, config);
    //supplement facts 스크래핑
    const html = response.data;
    const $ = cheerio.load(html);
    const factsSelector =
      'body > div.product-grouping-wrapper.defer-block > article > div.container.product-overview > div > section > div.inner-content > div > div > div.col-xs-24.col-md-10 > div > table > tbody > tr';
    const supplementFacts = {};
    const factsElems = $(factsSelector);
    factsElems.each((idx, node) => {
      if (2 < idx && idx < factsElems.length) {
        const nutrient = $(node).find('td').eq(0).contents().first().text();
        const data = $(node).find('td').eq(1).contents().first().text();
        if (
          nutrient !== ' ' &&
          nutrient !== '하루 영양소 기준치' &&
          data !== ''
        ) {
          const value = data.includes('mg')
            ? parseInt(data, 10)
            : parseInt(data, 10) / 1000;
          supplementFacts[nutrient] = value;
        }
      }
    });
    return supplementFacts;
  }
}
