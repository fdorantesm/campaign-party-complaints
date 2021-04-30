import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;
  @IsString()
  @IsNotEmpty()
  public readonly code: string;
}
