import { registerAs } from '@nestjs/config';

import { JwtConfigType } from '../types/jwt.config.type';

export const jwtConfigLoader = registerAs(
  'jwt',
  (): JwtConfigType => ({
    secret: process.env.JWT_SECRET,
    expires: Number(process.env.JWT_EXPIRES),
    salts: Number(process.env.JWT_SALTS),
  }),
);
