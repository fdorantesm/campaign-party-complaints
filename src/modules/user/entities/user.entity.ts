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

  @Prop({ type: String, required: true, select: false })
  public password: string;

  @Prop({ type: Boolean, default: false })
  public enabled: boolean;

  @Prop({ type: Types.ObjectId, ref: 'AccountEntity' })
  public account?: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  public owner?: boolean;

  @Prop({ type: Types.ObjectId, ref: 'StateEntity' })
  public state?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CityEntity' })
  public city?: Types.ObjectId;
}

const UserSchema = SchemaFactory.createForClass(UserEntity);

// eslint-disable-next-line @typescript-eslint/no-var-requires
UserSchema.plugin(require('mongoose-beautiful-unique-validation'));

UserSchema.index({ email: 1 }, { unique: true });

export { UserSchema };
