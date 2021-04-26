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

export class AddUserDto {
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

  @IsMongoId()
  @IsOptional()
  readonly state?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  readonly city?: Types.ObjectId;
}
