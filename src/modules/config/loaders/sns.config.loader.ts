import { registerAs } from '@nestjs/config';

import { SnsConfigType } from '../types/sns.config.type';

export const snsConfigLoader = registerAs(
  'sns',
  (): SnsConfigType => ({
    accessKey: process.env.SNS_ACCESS_KEY,
    accessSecretKey: process.env.SNS_ACCESS_SECRET_KEY
  })
);
