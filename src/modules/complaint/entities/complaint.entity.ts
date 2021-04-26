import { Schema, SchemaFactory, Prop, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GeoJsonPointType } from '../types/geo-json-point.type';

@Schema({
  collection: 'complaints',
  timestamps: true,
  autoIndex: true,
})
export class ComplaintEntity extends Document {
  @Prop({ type: String, required: true, index: true })
  public candidate: string;

  @Prop({ type: String })
  public campaign?: string;

  @Prop({
    type: Types.ObjectId,
    index: true,
    ref: 'StateEntity',
  })
  public state?: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    index: true,
    ref: 'CityEntity',
  })
  public city?: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    index: true,
    ref: 'PositionEntity',
  })
  public position: Types.ObjectId;

  @Prop({ type: String, required: true })
  public party: string;

  @Prop({ type: Date })
  public eventDateTime?: Date;

  @Prop({ type: {} })
  public eventLocation?: GeoJsonPointType;

  @Prop({ type: Boolean })
  public isTwice?: boolean;

  @Prop({ type: String })
  public description?: string;

  @Prop(
    raw([
      {
        type: [Types.ObjectId],
        ref: 'FileEntity',
      },
    ]),
  )
  public files?: Types.ObjectId[];

  @Prop({ type: Number, default: 0 })
  public status: number;

  @Prop({ type: Types.ObjectId, ref: 'UserEntity' })
  public user: Types.ObjectId;
}

const ComplaintSchema = SchemaFactory.createForClass(ComplaintEntity);

ComplaintSchema.index({ location: '2dsphere' });

export { ComplaintSchema };
