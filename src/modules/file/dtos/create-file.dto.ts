import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFileDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  public object?: Types.ObjectId;

  @IsString()
  @IsOptional()
  public objectModel?: string;

  @IsString()
  @IsNotEmpty()
  public type: string;

  @IsString()
  @IsNotEmpty()
  public path: string;
}
