import { Injectable } from '@nestjs/common';
import {
  PaginateModel,
  FilterQuery,
  QueryOptions,
  PaginateResult,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';

import { JsonType } from '../../common/types/json.type';
import { MongodbQueryResultType } from '../../common/types/mongodb-query-result.type';
import { PositionEntity } from '../entities/position.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PositionRepository {
  constructor(
    @InjectModel(PositionEntity.name)
    private readonly model: PaginateModel<PositionEntity>,
  ) {}

  public find(
    filter?: FilterQuery<PositionEntity>,
    options?: QueryOptions,
  ): Promise<PositionEntity[]> {
    return this.model.find(filter, options).exec();
  }

  public findOne(
    filter?: FilterQuery<PositionEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options).exec();
  }

  public create(data: Partial<PositionEntity>) {
    return this.model.create(data);
  }

  public update(
    filter: FilterQuery<PositionEntity>,
    data: UpdateQuery<PositionEntity>,
    options?: QueryOptions,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filter, data, options).exec();
  }

  public delete(
    filter: FilterQuery<PositionEntity>,
  ): Promise<MongodbQueryResultType> {
    return this.model.deleteOne(filter).exec();
  }
}
