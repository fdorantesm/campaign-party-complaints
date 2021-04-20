import { ConfigType } from '../types/config.type';

export type configKeyTypes =
  | 'aws'
  | 'jwt'
  | 'mongodb'
  | 's3'
  | 'server'
  | 'ses'
  | 'sns';

export const configLoader = (): ConfigType => ({
  server: {
    tz: process.env.TZ,
    port: parseInt(process.env.APP_PORT, 10),
    securePort: parseInt(process.env.APP_SECURE_PORT, 10),
    debug: process.env.APP_DEBUG === 'true',
  },
  mongodb: {
    main: {
      server: process.env.API_MONGODB_HOST,
      port: parseInt(process.env.API_MONGODB_PORT),
      database: process.env.API_MONGODB_DATABASE,
      user: process.env.API_MONGODB_USER,
      password: process.env.API_MONGODB_PASSWORD,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES,
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    accessSecretKey: process.env.AWS_ACCESS_SECRET_KEY,
  },
  s3: {
    accessKey: process.env.API_S3_ACCESS_KEY,
    accessSecretKey: process.env.API_S3_ACCESS_SECRET_KEY,
    endpoint: process.env.API_S3_ENDPOINT,
    bucket: process.env.API_S3_BUCKET,
  },
  ses: {
    region: process.env.SES_REGION,
    accessKey: process.env.SES_ACCESS_KEY,
    accessSecretKey: process.env.SES_ACCESS_SECRET_KEY,
  },
  sns: {
    accessKey: process.env.SNS_ACCESS_KEY,
    accessSecretKey: process.env.SNS_ACCESS_SECRET_KEY,
  },
});
