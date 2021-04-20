import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { TokenPayload } from '../types/token-payload.type';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: TokenPayload): Promise<JwtPayload> {
    return {};
  }

  private async loadUser(userId: Types.ObjectId): Promise<any> {
    return {};
  }
}
