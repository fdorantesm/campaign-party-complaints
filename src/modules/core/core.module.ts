import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import { mongooseUuid } from '@app/mongoose-uuid';
import { mongooseEloquent } from '@app/mongoose-eloquent';
import { S3Module } from 'nestjs-s3';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { mongodbConfigLoader, s3ConfigLoader } from '../config/loaders';
import { options } from '../config/options/config.options';
import { MongodbConfigType } from '../config/types/mongodb-config.type';
import { S3ConfigType } from '../config/types/s3.config.type';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(options),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongodbConfigLoader)],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let uri: string;
        const debug = configService.get<boolean>('server.debug');
        const config = configService.get<MongodbConfigType>('mongodb.main');

        if (debug) {
          mongoose.set('debug', true);
        }

        // TODO: Create function to get uri string
        if (config.port) {
          uri = `mongodb://${config.server}:${config.port}`;
        } else {
          uri = `mongodb+srv://${config.server}`;
        }

        return {
          uri,
          dbName: config.database,
          auth: {
            user: config.user,
            password: config.password,
          },
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          connectionFactory: async (
            connection: mongoose.Connection,
          ): Promise<mongoose.Connection> => {
            connection.plugin(mongoosePaginate);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            connection.plugin(require('mongoose-delete'));
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            connection.plugin(require('@meanie/mongoose-to-json'));
            connection.plugin(mongooseUuid);
            connection.plugin(mongooseEloquent);
            return connection;
          },
        };
      },
    }),
    S3Module.forRootAsync({
      imports: [ConfigModule.forFeature(s3ConfigLoader)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<S3ConfigType>('s3');
        return {
          config: {
            accessKeyId: config.accessKey,
            secretAccessKey: config.accessSecretKey,
            endpoint: config.endpoint,
            s3ForcePathStyle: true,
            signatureVersion: 'v4',
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class CoreModule {}
