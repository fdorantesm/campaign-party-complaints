import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';

import { TokenPayloadType } from '../types/token-payload.type';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { JwtConfigType } from '../../config/types/jwt.config.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtConfigType>('jwt').secret,
    });
  }

  async validate(payload: TokenPayloadType): Promise<TokenPayloadType> {
    const user = await this.loadUser(payload.id);
    if (!user) {
      throw new UnauthorizedException('INVALID_ACCESS_TOKEN');
    }
    return {
      id: user.id,
    };
  }

  private loadUser(userId: Types.ObjectId): Promise<UserEntity> {
    return this.userService.findOne({
      _id: userId,
    });
  }
}
