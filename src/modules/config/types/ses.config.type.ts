import { AwsConfigType } from './aws.config.type';

export type SesConfigType = AwsConfigType & {
  region: string;
};
