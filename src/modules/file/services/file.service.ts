import { Injectable } from '@nestjs/common';
import { FilterQuery, PaginateResult, Types } from 'mongoose';
import { PaginationInterface } from '../../common/interfaces/pagination.interface';
import { CreateFileDto } from '../dtos/create-file.dto';
import { FileEntity } from '../entities/file.entity';
import { FileRepository } from '../repositories/file.repository';

@Injectable()
export class FileService {
  constructor(private readonly repository: FileRepository) {}
  public find(
    params?: FilterQuery<FileEntity>,
    pagination?: PaginationInterface,
  ): Promise<PaginateResult<FileEntity>> {
    return this.repository.find(params, pagination);
  }

  public findOne(params?: FilterQuery<FileEntity>): Promise<FileEntity> {
    return this.repository.findOne(params);
  }

  public create(params: Partial<FileEntity>): Promise<FileEntity> {
    return this.repository.create(params);
  }

  public async delete(_id: Types.ObjectId): Promise<boolean> {
    const query = await this.repository.delete(_id);
    return query.deletedCount > 0;
  }
}
