import { S3Module } from 'nestjs-s3';
import { Module } from '@nestjs/common';

import { UploadController } from './controllers/upload.controller';
import { CommonModule } from '../common/common.module';
import { FileModule } from '../file/file.module';
import { UploadService } from './services/upload.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { s3ConfigLoader } from '../config/loaders';
import { S3ConfigType } from '../config/types/s3.config.type';
import { S3Service } from './services/s3.service';

@Module({
  imports: [
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
    CommonModule,
    FileModule,
  ],
  controllers: [UploadController],
  providers: [UploadService, S3Service],
  exports: [UploadService],
})
export class UploadModule {}
