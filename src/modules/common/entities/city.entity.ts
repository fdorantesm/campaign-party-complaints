import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'cities',
  timestamps: true,
  autoIndex: true,
})
export class CityEntity extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, required: true, index: true, ref: 'StateEntity' })
  public state: Types.ObjectId;

  @Prop({ type: Number, required: true, index: true })
  public rel: number;

  @Prop({ type: String, index: true })
  public uuid?: number;
}
export const CitySchema = SchemaFactory.createForClass(CityEntity);
