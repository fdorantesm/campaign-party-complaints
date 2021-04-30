import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

import { FileBufferInterface } from '../interfaces/file-buffer.interface';
import { FileEntity } from '../../file/entities/file.entity';
import { UploadService } from '../services/upload.service';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { AuthRequestType } from 'src/modules/core/types/auth-request.type';
import { fileFilter } from '../filters/file.filter';

@Controller('/uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/batch')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: {
        files: 5,
        fileSize: 1024000000 * 5,
      },
      fileFilter,
    }),
  )
  public async uploadFiles(
    @UploadedFiles() files: FileBufferInterface[],
    @Body('path') path: string,
    @Request() req: AuthRequestType,
  ): Promise<FileEntity[]> {
    return this.uploadService.bulkUpload(files, path);
  }

  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024000000 * 5,
        files: 5,
      },
      fileFilter,
    }),
  )
  public async uploadFile(
    @UploadedFile() file: FileBufferInterface,
    @Body('path') path: string,
    @Request() req: AuthRequestType,
  ): Promise<FileEntity> {
    return this.uploadService.singleUpload(file, path);
  }
}
