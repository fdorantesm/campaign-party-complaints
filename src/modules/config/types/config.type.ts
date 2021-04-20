import { AwsConfigType } from './aws.config.type';
import { JwtConfigType } from './jwt.config.type';
import { MongodbConfigType } from './mongodb-config.type';
import { S3ConfigType } from './s3.config.type';
import { ServerConfigType } from './server.type';
import { SesConfigType } from './ses.config.type';
import { SnsConfigType } from './sns.config.type';

export type ConfigType = {
  server: ServerConfigType;
  mongodb: {
    [key: string]: MongodbConfigType;
  };
  jwt: JwtConfigType;
  s3: S3ConfigType;

  sns: SnsConfigType;

  ses: SesConfigType;
  aws: AwsConfigType;
};
