import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LeanDocument } from 'mongoose';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { LoginDto } from '../dtos/login.dto';

import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../types/jwt-payload.type';
import { JwtGuard } from '../guards/jwt.guard';
import { Token } from '../decorators/token.decorator';
import { User } from '../decorators/user.decorator';
import { TokenPayloadType } from '../types/token-payload.type';
import { AuthRequestType } from 'src/modules/core/types/auth-request.type';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public register(
    @Body() auth: RegisterDto,
  ): Promise<LeanDocument<UserEntity>> {
    return this.authService.register(auth);
  }

  @Post('/login')
  public login(@Body() data: LoginDto): Promise<JwtPayload> {
    return this.authService.login(data);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  public me(
    @Request() req: AuthRequestType,
  ): Promise<LeanDocument<UserEntity>> {
    return this.authService.me(req);
  }

  @UseGuards(JwtGuard)
  @Post('/logout')
  public logout(
    @User() user: TokenPayloadType,
    @Token() token: string,
  ): Promise<void> {
    return this.authService.logout(user, token);
  }
}
