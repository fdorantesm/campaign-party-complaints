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

  @ValidateIf((o) => o.state !== null)
  @IsOptional()
  public readonly state?: string;

  @ValidateIf((o) => o.city !== null)
  @IsOptional()
  public readonly city?: string;

  @IsOptional()
  public readonly phone?: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}
