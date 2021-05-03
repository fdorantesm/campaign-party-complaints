import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';

import { TokenPayloadType } from '../types/token-payload.type';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { JwtConfigType } from '../../config/types/jwt.config.type';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtConfigType>('jwt').secret,
    });
  }

  async validate(payload: TokenPayloadType): Promise<TokenPayloadType> {
    try {
      const user = await this.loadUser(payload.id);
      await this.validateWhitelist(user.id);
      if (!user) {
        throw new UnauthorizedException('Token inválido');
      }
      return {
        id: user._id,
        account: user.account,
        role: user.role,
      };
    } catch (err) {
      throw new UnauthorizedException('Usuario inválido');
    }
  }

  private async validateWhitelist(user: string) {
    const logged = await this.tokenService.find({
      user: Types.ObjectId(user),
      type: 'logout',
    });
    if (logged) {
      Logger.log(user, 'Session failer');
      throw new UnauthorizedException();
    }
  }

  private loadUser(userId: Types.ObjectId): Promise<UserEntity> {
    return this.userService.findOne({
      _id: userId,
    });
  }
}
