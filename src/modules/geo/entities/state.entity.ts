import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'states',
  timestamps: false,
  autoIndex: true,
})
export class StateEntity extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: Number, required: true, index: true })
  public rel: number;

  @Prop({ type: String, index: true })
  public uuid?: number;
}
export const StateSchema = SchemaFactory.createForClass(StateEntity);
