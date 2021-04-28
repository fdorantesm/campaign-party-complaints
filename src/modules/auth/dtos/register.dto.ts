import { Types } from 'mongoose';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @IsString()
  @IsOptional()
  public readonly phone?: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @IsMongoId()
  @IsOptional()
  public readonly state?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  public readonly city?: Types.ObjectId;
}
