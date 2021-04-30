import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-http-bearer';

import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class ApikeyStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(apiKey: string): Promise<JwtPayload> {
    throw new UnauthorizedException('Invalid API Key');
  }
}
