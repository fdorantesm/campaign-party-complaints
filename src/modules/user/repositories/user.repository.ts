import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, FilterQuery, QueryOptions } from 'mongoose';

import { UserEntity } from '../entities/user.entity';
import { JsonType } from '../../common/types/json.type';
import { MongodbQueryResultType } from '../../common/types/mongodb-query-result.type';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly model: PaginateModel<UserEntity>,
  ) {}

  public find(
    filter?: FilterQuery<UserEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<UserEntity[]> {
    return this.model.find(filter, projection, options).exec();
  }

  public findOne(
    filter?: FilterQuery<UserEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<UserEntity> {
    return this.model.findOne(filter, projection, options).exec();
  }

  public create(data: Partial<UserEntity>): Promise<UserEntity> {
    return this.model.create(data);
  }

  public deleteMany(
    filter?: FilterQuery<UserEntity>,
    options?: QueryOptions,
  ): Promise<MongodbQueryResultType> {
    return this.model.deleteMany(filter, options).exec();
  }

  public count(filter?: FilterQuery<UserEntity>): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
}
