import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsBoolean,
  IsMongoId,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateAccountUserDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsPhoneNumber()
  @IsOptional()
  readonly phone?: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsBoolean()
  readonly enabled: boolean;

  @IsMongoId()
  readonly account: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  readonly state?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  readonly city?: Types.ObjectId;

  @IsBoolean()
  @IsOptional()
  readonly owner?: boolean;

  @IsMongoId()
  readonly role: Types.ObjectId;
}
