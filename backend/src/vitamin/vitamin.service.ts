import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { VitaminAttrDto } from './dto/get-vitamin-attr.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Combination } from './schema/combination.schema';
import { CombiList } from './schema/combiList.schema';

@Injectable()
export class VitaminService {
  constructor(
    @InjectModel('Combination') private combinationModel: Model<Combination>,
    @InjectModel('CombiList') private combiListModel: Model<CombiList>,
  ) {}
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
          nutrient !== '' &&
          nutrient !== ' ' &&
          nutrient !== '하루 영양소 기준치' &&
          data !== '' &&
          data !== null
        ) {
          const value = data.includes('mg')
            ? parseInt(data, 10)
            : parseInt(data, 10) / 1000;
          const nutrientTrim = nutrient.trim();
          supplementFacts[nutrientTrim] = value;
        }
      }
    });
    return supplementFacts;
  }
  async saveCombination(
    uuid: string,
    id: string,
    title: string,
    total: Array<object>,
  ): Promise<void> {
    const newCombination = new this.combinationModel({
      _id: uuid,
      id,
      title,
      total,
    });
    try {
      await newCombination.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Failed to save combination data.',
      );
    }
    return;
  }
  async addCombiList(id: string, uuid: string, title: string) {
    try {
      const item = await this.combiListModel.findById({ _id: id });
      const newElem = { uuid, title };
      if (item) {
        await this.combiListModel.updateOne(
          { _id: id },
          { $push: { combiList: newElem } },
        );
      } else {
        const newitem = new this.combiListModel({
          _id: id,
          combiList: newElem,
        });
        await newitem.save();
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to save combiList data.');
    }
  }
  async getCombiList(id: string) {
    const item = await this.combiListModel.findById({ _id: id });
    if (item) {
      return item.combiList;
    } else {
      return [];
    }
  }
}
