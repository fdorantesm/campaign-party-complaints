import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AccountSeederDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsBoolean()
  public readonly public: boolean;
}
