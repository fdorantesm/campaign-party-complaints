import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsMongoId,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly name?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  public readonly email?: string;

  @IsOptional()
  readonly phone?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly password?: string;

  @IsMongoId()
  @IsOptional()
  readonly state?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  readonly city?: Types.ObjectId;
}
