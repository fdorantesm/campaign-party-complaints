import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel, PaginateResult, Types } from 'mongoose';

import { PaginationInterface } from '../../common/interfaces/pagination.interface';
import { FileEntity } from '../entities/file.entity';
import { MongoDeletedQueryResult } from '../../common/interfaces/mongo-deleted-query-result.interface';
import { CreateFileDto } from '../dtos/create-file.dto';

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(FileEntity.name)
    private readonly model: PaginateModel<FileEntity>,
  ) {}

  public find(
    params?: FilterQuery<FileEntity>,
    pagination?: PaginationInterface,
  ): Promise<PaginateResult<FileEntity>> {
    return this.model.paginate(params, pagination);
  }

  public findOne(params?: FilterQuery<FileEntity>): Promise<FileEntity> {
    return this.model.findOne(params).exec();
  }

  public create(params: Partial<FileEntity>): Promise<FileEntity> {
    return this.model.create(params);
  }

  public async delete(_id: Types.ObjectId): Promise<MongoDeletedQueryResult> {
    return await this.model.deleteOne({ _id });
  }
}
