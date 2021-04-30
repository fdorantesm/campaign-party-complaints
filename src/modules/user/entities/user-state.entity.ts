import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'userStates',
  autoIndex: true,
})
export class UserStateEntity extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'StateEntity' })
  public state: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'UserEntity' })
  public user: Types.ObjectId;
}

const UserStateSchema = SchemaFactory.createForClass(UserStateEntity);

UserStateSchema.index({ user: 1, state: 1 }, { unique: true });

export { UserStateSchema };
