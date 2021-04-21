import { Types } from 'mongoose';

export type UserType = {
  name: string;
  email: string;
  phone: string;
  password?: string;
  state: Types.ObjectId;
  city: Types.ObjectId;
  enabled: boolean;
};
