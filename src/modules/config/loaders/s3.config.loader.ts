import { registerAs } from '@nestjs/config';
import { S3ConfigType } from '../types/s3.config.type';

export const s3ConfigLoader = registerAs(
  's3',
  (): S3ConfigType => ({
    accessKey: process.env.S3_ACCESS_KEY,
    accessSecretKey: process.env.S3_ACCESS_SECRET_KEY,
    endpoint: process.env.S3_ENDPOINT,
    bucket: process.env.S3_BUCKET
  })
);
