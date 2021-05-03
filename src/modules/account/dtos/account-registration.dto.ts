import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Types } from 'mongoose';

export class AccountRegistrationDto {
  @IsString()
  @IsNotEmpty()
  public readonly account: string;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsMongoId()
  @IsOptional()
  @ValidateIf((o) => o.state !== null)
  public readonly state?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @ValidateIf((o) => o.city !== null)
  public readonly city?: Types.ObjectId;

  @IsOptional()
  public readonly phone?: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}
