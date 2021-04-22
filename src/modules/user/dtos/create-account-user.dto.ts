import { Types } from 'mongoose';

export class CreateAccountUserDto {
  public readonly name: string;
  public readonly email: string;
  public readonly phone?: string;
  public readonly password: string;
  public readonly enabled: boolean;
  public readonly account: Types.ObjectId;
  public readonly state?: Types.ObjectId;
  public readonly city?: Types.ObjectId;
}
