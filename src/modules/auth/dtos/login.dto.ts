import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}
