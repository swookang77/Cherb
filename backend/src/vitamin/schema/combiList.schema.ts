import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CombiListElem } from '../models/vitamin.model';

export type CombiListDocument = HydratedDocument<CombiList>;
//Post스키마 구성
@Schema()
export class CombiList {
  @Prop({ required: true, unique: true })
  _id: string;
  @Prop()
  combiList: Array<CombiListElem>;
}
//Post스키마 생성
export const CombiListSchema = SchemaFactory.createForClass(CombiList);
