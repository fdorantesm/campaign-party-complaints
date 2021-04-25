import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { FileService } from '../../file/services/file.service';
import { FileEntity } from '../../file/entities/file.entity';
import { S3Service } from './s3.service';
import { FileBufferInterface } from '../interfaces/file-buffer.interface';

@Injectable()
export class UploadService {
  constructor(
    private readonly fileService: FileService,
    private readonly s3Service: S3Service,
  ) {}

  public singleUpload(
    file: FileBufferInterface,
    path: string,
  ): Promise<FileEntity> {
    return this.s3Service.singleUpload(file, path).then((data) =>
      this.fileService
        .create({
          path: data.Key,
          type: 'file', // TODO: Save type of file
          name: data.Key,
        })
        .catch((err) => {
          this.s3Service.delete(data.Key);
          Logger.log(err);
          throw new InternalServerErrorException();
        }),
    );
  }

  public async bulkUpload(
    files: FileBufferInterface[],
    path: string,
  ): Promise<FileEntity[]> {
    const uploads = [];
    files.map((file) => {
      uploads.push(this.singleUpload(file, path));
    });
    return Promise.all(uploads);
  }
}
