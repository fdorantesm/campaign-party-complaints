import { Types } from 'mongoose';

export type TokenPayloadType = {
  id: Types.ObjectId;
  account: Types.ObjectId;
  role: Types.ObjectId;
};
