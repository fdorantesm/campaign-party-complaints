import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileEntity, FileSchema } from './entities/file.entity';
import { FileService } from './services/file.service';
import { FileRepository } from './repositories/file.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FileEntity.name, schema: FileSchema }]),
  ],
  providers: [FileService, FileRepository],
  exports: [FileService],
})
export class FileModule {}
