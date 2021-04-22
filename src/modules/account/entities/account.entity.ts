import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'account',
  timestamps: true,
  autoIndex: true,
})
export class AccountEntity extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: Types.ObjectId, ref: 'StateEntity' })
  public state?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CityEntity' })
  public city?: Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  public enabled: boolean;

  @Prop({ type: Boolean, default: false })
  public public: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
