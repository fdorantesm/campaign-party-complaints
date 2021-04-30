import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'parties',
  autoIndex: true,
})
export class PartyEntity extends Document {
  @Prop({ type: String, required: true, index: true })
  public name: string;

  @Prop({ type: String, required: true, index: true })
  public code: string;

  @Prop({ type: Boolean, required: false })
  public isLocal?: boolean;
}

export const PartySchema = SchemaFactory.createForClass(PartyEntity);
