import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TotalElem, VitaminListElem } from '../models/vitamin.model';

export type CombinationDocument = HydratedDocument<Combination>;

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

export const CombinationSchema = SchemaFactory.createForClass(Combination);
