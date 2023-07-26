import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TotalElem, VitaminListElem } from '../models/vitamin.model';

export type CombinationDocument = HydratedDocument<Combination>;
//Post스키마 구성
@Schema()
export class Combination {
  @Prop({ required: true, unique: true })
  _id: string;
  @Prop()
  id: string;
  @Prop()
  title: string;
  @Prop()
  vitaminList: Array<VitaminListElem>;
  @Prop()
  total: Array<TotalElem>;
}
//Post스키마 생성
export const CombinationSchema = SchemaFactory.createForClass(Combination);
