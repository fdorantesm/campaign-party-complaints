import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, FilterQuery, QueryOptions } from 'mongoose';

import { UserStateEntity } from '../entities/user-state.entity';
import { JsonType } from '../../common/types/json.type';
import { MongodbQueryResultType } from '../../common/types/mongodb-query-result.type';

@Injectable()
export class UserStateRepository {
  constructor(
    @InjectModel(UserStateEntity.name)
    private readonly model: PaginateModel<UserStateEntity>,
  ) {}

  public find(
    filter?: FilterQuery<UserStateEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<UserStateEntity[]> {
    return this.model.find(filter, projection, options).exec();
  }

  public findOne(
    filter?: FilterQuery<UserStateEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<UserStateEntity> {
    return this.model.findOne(filter, projection, options).exec();
  }

  public create(data: Partial<UserStateEntity>): Promise<UserStateEntity> {
    return this.model.create(data);
  }

  public deleteMany(
    filter?: FilterQuery<UserStateEntity>,
    options?: QueryOptions,
  ): Promise<MongodbQueryResultType> {
    return this.model.deleteMany(filter, options).exec();
  }
}
