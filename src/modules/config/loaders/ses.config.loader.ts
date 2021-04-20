import { registerAs } from '@nestjs/config';

import { SesConfigType } from '../types/ses.config.type';

export const sesConfigLoader = registerAs(
  'ses',
  (): SesConfigType => ({
    region: process.env.SES_REGION,
    accessKey: process.env.SES_ACCESS_KEY,
    accessSecretKey: process.env.SES_ACCESS_SECRET_KEY
  })
);
