import { Types } from 'mongoose';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GeoJsonPointType, GeoJsonPoint } from '../types/geo-json-point.type';

export class CreateComplaintDto {
  @IsString()
  public candidate: string;

  @IsString()
  @IsOptional()
  public campaign?: string;

  @IsMongoId()
  @IsOptional()
  public state?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  public city?: Types.ObjectId;

  @IsMongoId()
  public position: Types.ObjectId;

  @IsNotEmpty()
  public party: string;

  @IsDateString()
  @IsOptional()
  public eventDateTime?: Date;

  @Type(() => GeoJsonPoint)
  public eventLocation?: GeoJsonPointType;

  @IsBoolean()
  @IsOptional()
  public isTwice?: boolean;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsArray()
  @Type(() => Types.ObjectId)
  public files?: Types.ObjectId[];
}
