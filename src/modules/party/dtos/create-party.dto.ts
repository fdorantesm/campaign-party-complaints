import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreatePartyDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsNotEmpty()
  @IsString()
  public readonly code: string;

  @IsBoolean()
  @IsOptional()
  public readonly isLocal?: boolean;
}
