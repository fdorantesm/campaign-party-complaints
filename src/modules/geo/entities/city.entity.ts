import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'cities',
  timestamps: false,
  autoIndex: true,
})
export class CityEntity extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    index: true,
    ref: 'StateEntity',
  })
  public state: Types.ObjectId;

  @Prop({ type: Number, required: true, index: true })
  public rel: number;

  @Prop({ type: Number, required: true, index: true })
  public parent: number;

  @Prop({ type: String, index: true })
  public uuid?: string;
}
export const CitySchema = SchemaFactory.createForClass(CityEntity);
