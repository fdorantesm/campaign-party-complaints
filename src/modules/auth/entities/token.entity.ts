import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { configLoader } from 'src/modules/config/loaders';

const config = configLoader();

@Schema({
  collection: 'tokens',
  timestamps: true,
})
export class TokenEntity extends Document {
  @Prop({ type: String, required: true })
  public token: string;

  @Prop({ type: Types.ObjectId, required: true })
  public user: Types.ObjectId;

  @Prop({ type: String, enum: ['login', 'logout'], required: true })
  public type: 'login' | 'logout';

  @Prop({
    type: Date,
    default: Date.now,
    index: { expires: config.jwt.expires },
  })
  public expireAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(TokenEntity);
