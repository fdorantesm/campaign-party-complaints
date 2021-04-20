import { registerAs } from '@nestjs/config';

import { ServerConfigType } from '../types/server.type';

export const serverConfigLoader = registerAs(
  'server',
  (): ServerConfigType => ({
    name: process.env.NAME,
    tz: process.env.TZ,
    port: parseInt(process.env.PORT, 10),
    securePort: parseInt(process.env.SECURE_PORT, 10),
    debug: process.env.DEBUG === 'true'
  })
);
