import { Types } from 'mongoose';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsLatitude,
  IsLongitude,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateComplaintDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly candidate?: string;

  @IsString()
  @IsOptional()
  public readonly campaign?: string;

  @IsMongoId()
  @IsOptional()
  public readonly state?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  public readonly city?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  public readonly position?: Types.ObjectId;

  @IsNotEmpty()
  @IsOptional()
  @IsNotEmpty()
  public readonly party?: string;

  @IsDateString()
  @IsOptional()
  public readonly eventDateTime?: Date;

  @IsNumber()
  @IsLatitude()
  @IsNotEmpty()
  @ValidateIf((form) => form.longitude)
  public readonly latitude?: number;

  @IsNumber()
  @IsLongitude()
  @IsNotEmpty()
  @ValidateIf((form) => form.latitude)
  public readonly longitude?: number;

  @IsBoolean()
  @IsOptional()
  public readonly isTwice?: boolean;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public readonly description?: string;

  @IsArray()
  @IsOptional()
  public readonly files?: Types.ObjectId[];

  @IsNumber()
  @IsOptional()
  public status?: number;
}
