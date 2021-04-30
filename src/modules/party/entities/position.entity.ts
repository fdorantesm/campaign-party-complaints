import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'positions',
  autoIndex: true,
})
export class PositionEntity extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, required: true })
  public code: string;
}

export const PositionSchema = SchemaFactory.createForClass(PositionEntity);
