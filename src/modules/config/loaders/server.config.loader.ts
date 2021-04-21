import { registerAs } from '@nestjs/config';

import { ServerConfigType } from '../types/server.type';

export const serverConfigLoader = registerAs(
  'server',
  (): ServerConfigType => ({
    name: process.env.APP_NAME,
    tz: process.env.TZ || 'UTC',
    port: parseInt(process.env.APP_PORT, 10),
    securePort: parseInt(process.env.APP_SECURE_PORT, 10),
    debug: process.env.APP_DEBUG === 'true',
  }),
);
