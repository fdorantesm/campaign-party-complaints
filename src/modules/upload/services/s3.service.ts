import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PromiseResult } from 'aws-sdk/lib/request';
import { InjectS3, S3 } from 'nestjs-s3';
import { AWSError } from 'aws-sdk';
import {
  CreateBucketOutput,
  DeleteObjectOutput,
  ListBucketsOutput,
  ManagedUpload,
  PutObjectRequest,
} from 'aws-sdk/clients/s3';

import { FileRequestInterface } from '../interfaces/file-request.interface';
import { FileBufferInterface } from '../interfaces/file-buffer.interface';
import { MimeTypesService } from '../../common/mime-types/mime-types.service';
import { S3ConfigType } from '../../config/types/s3.config.type';
import { UuidService } from '../../common/uuid-generator/uuid.service';

@Injectable()
export class S3Service {
  protected config: S3ConfigType;

  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly uuidService: UuidService,
    private readonly mimeTypeService: MimeTypesService,
    private readonly configService: ConfigService,
  ) {
    this.config = this.configService.get<S3ConfigType>('s3');
  }

  public createBucket(
    bucketName: string,
  ): Promise<PromiseResult<CreateBucketOutput, AWSError>> {
    return this.s3.createBucket({ Bucket: bucketName }).promise();
  }

  public listBuckets(): Promise<PromiseResult<ListBucketsOutput, AWSError>> {
    return this.s3.listBuckets().promise();
  }

  public upload(
    request: FileRequestInterface,
  ): Promise<ManagedUpload.SendData> {
    const params: PutObjectRequest = {
      Bucket: this.config.bucket,
      Body: request.file,
      Key: `${request.path}/${request.filename}`,
      ACL: 'public-read',
      ContentDisposition: 'attachment',
      ContentType: this.mimeTypeService.lookup(request.filename),
    };
    return this.s3.upload(params).promise();
  }

  public singleUpload(
    file: FileBufferInterface,
    path: string,
  ): Promise<ManagedUpload.SendData> {
    if (file) {
      const ext = this.mimeTypeService.extension(file?.mimetype) || 'unknown';
      const filename = `${this.uuidService.generate()}.${ext}`;
      return this.upload({ filename, file: file?.buffer, path });
    }
    throw new BadRequestException(
      'No se han encontrado archivos en la solicitud',
    );
  }

  public bulkUpload(
    files: FileBufferInterface[],
    path: string,
  ): Promise<ManagedUpload.SendData[]> {
    const promises = [];
    files.map((item: FileBufferInterface) => {
      const ext = this.mimeTypeService.extension(item.mimetype) || 'unknown';
      promises.push(
        this.upload({
          path,
          file: item.buffer,
          filename: `${this.uuidService.generate()}.${ext}`,
        }),
      );
    });
    return Promise.all(promises);
  }

  public delete(path: string, bucket?: string): Promise<DeleteObjectOutput> {
    return new Promise((resolve, reject) => {
      return this.s3.deleteObject(
        { Key: path, Bucket: bucket || this.config.bucket },
        (err, data) => {
          if (err) reject(err);
          resolve(data);
        },
      );
    });
  }
}
