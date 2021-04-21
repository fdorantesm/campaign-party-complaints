import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
  autoIndex: true,
})
export class UserEntity extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({
    raw: {
      index: true,
      required: true,
      unique: 'Email ({VALUE}) is already registered',
      type: String,
    },
  })
  public email: string;

  @Prop({
    raw: {
      type: String,
      index: true,
      unique: 'Phone number ({VALUE}) is already registered',
      sparse: true,
    },
  })
  public phone?: string;

  @Prop({ type: Types.ObjectId, ref: 'StateEntity' })
  public state?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CityEntity' })
  public city?: Types.ObjectId;

  @Prop({ type: String, required: true, select: false })
  public password: string;

  @Prop({ type: Boolean, default: false })
  public enabled: boolean;
}

const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.index({ email: 1 }, { unique: true });

export { UserSchema };
