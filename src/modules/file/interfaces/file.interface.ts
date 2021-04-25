import { Types } from 'mongoose';

export interface FileInterface {
  name?: string;
  object?: Types.ObjectId;
  objectModel?: string;
  type: string;
  path: string;
}
