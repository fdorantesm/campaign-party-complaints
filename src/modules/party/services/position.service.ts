import { Injectable } from '@nestjs/common';
import {
  FilterQuery,
  QueryOptions,
  PaginateResult,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';

import { JsonType } from '../../common/types/json.type';
import { MongodbQueryResultType } from '../../common/types/mongodb-query-result.type';
import { PositionEntity } from '../entities/position.entity';
import { PositionRepository } from '../repositories/position.repository';

@Injectable()
export class PositionService {
  constructor(private readonly repository: PositionRepository) {}

  public find(
    filter?: FilterQuery<PositionEntity>,
    options?: QueryOptions,
  ): Promise<PaginateResult<PositionEntity>> {
    return this.repository.find(filter, options);
  }

  public findOne(
    filter?: FilterQuery<PositionEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ) {
    return this.repository.findOne(filter, projection, options);
  }

  public create(data: Partial<PositionEntity>) {
    return this.repository.create(data);
  }

  public update(
    filter: FilterQuery<PositionEntity>,
    data: UpdateQuery<PositionEntity>,
    options?: QueryOptions,
  ): Promise<UpdateWriteOpResult> {
    return this.repository.update(filter, data, options);
  }

  public delete(
    filter: FilterQuery<PositionEntity>,
  ): Promise<MongodbQueryResultType> {
    return this.repository.delete(filter);
  }
}
