import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { configLoader } from '../../config/loaders/config.loader';

@Schema({
  collection: 'files',
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class FileEntity extends Document {
  @Prop({ type: String })
  public name?: string;

  @Prop({ type: Types.ObjectId, refPath: 'objectModel' })
  public object?;

  @Prop({ type: String, enum: ['UserEntity', 'HomeEntity'] })
  public objectModel?: string;

  @Prop({
    enum: ['file', 'image', 'video', 'audio', 'document', 'bill', 'receipt'],
    default: 'file',
  })
  public type: string;

  @Prop({ type: String, required: true, index: true })
  path: string;

  @Prop({ type: Boolean, default: true })
  destroy?: boolean;

  @Prop({ type: String, required: false })
  public url?: string;

  @Prop({ type: Types.ObjectId, required: true })
  public user: Types.ObjectId;
}

const FileSchema = SchemaFactory.createForClass(FileEntity);

FileSchema.pre('save', function (next) {
  const config = configLoader();
  const key = this.name;
  this.name = this.name.replace(/^.+\//, '');
  this.path = `${config.s3.bucket}/${key}`;
  this.url = `${config.s3.endpoint}/${this.path}`;
  next();
});

export { FileSchema };
