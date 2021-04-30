import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'role',
  timestamps: false,
  autoIndex: true,
})
export class RoleEntity extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, required: true })
  public code: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
