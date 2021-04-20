import { registerAs } from '@nestjs/config';
import { MongodbConfigType } from '../types/mongodb-config.type';

export const mongodbConfigLoader = registerAs('mongodb', (): {
  [key: string]: MongodbConfigType;
} => ({
  main: {
    server: process.env.API_MONGODB_HOST,
    port: parseInt(process.env.API_MONGODB_PORT),
    database: process.env.API_MONGODB_DATABASE,
    user: process.env.API_MONGODB_USER,
    password: process.env.API_MONGODB_PASSWORD,
  },
}));
