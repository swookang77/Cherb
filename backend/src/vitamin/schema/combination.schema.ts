import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
  total: Array<object>;
}
//Post스키마 생성
export const CombinationSchema = SchemaFactory.createForClass(Combination);
