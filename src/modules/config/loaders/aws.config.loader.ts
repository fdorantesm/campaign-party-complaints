import { registerAs } from '@nestjs/config';
import { AwsConfigType } from '../types/aws.config.type';

export const awsConfigLoader = registerAs(
  'aws',
  (): AwsConfigType => ({
    accessKey: process.env.AWS_ACCESS_KEY,
    accessSecretKey: process.env.AWS_ACCESS_SECRET_KEY,
  }),
);
