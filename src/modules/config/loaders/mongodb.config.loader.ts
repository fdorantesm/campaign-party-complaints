import { registerAs } from '@nestjs/config';
import { MongodbConfigType } from '../types/mongodb-config.type';

export const mongodbConfigLoader = registerAs('mongodb', (): {
  [key: string]: MongodbConfigType;
} => ({
  main: {
    server: process.env.MONGODB_SERVER,
    port: parseInt(process.env.MONGODB_PORT),
    database: process.env.MONGODB_DATABASE,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
  },
}));
