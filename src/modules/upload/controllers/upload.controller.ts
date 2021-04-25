import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

import { FileBufferInterface } from '../interfaces/file-buffer.interface';
import { FileEntity } from '../../file/entities/file.entity';
import { UploadService } from '../services/upload.service';
import { JwtGuard } from '../../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('/uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/batch')
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadFiles(
    @UploadedFiles() files: FileBufferInterface[],
    @Body('path') path: string,
  ): Promise<FileEntity[]> {
    return this.uploadService.bulkUpload(files, path);
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @UploadedFile() file: FileBufferInterface,
    @Body('path') path: string,
  ): Promise<FileEntity> {
    return this.uploadService.singleUpload(file, path);
  }
}
