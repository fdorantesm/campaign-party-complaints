import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PaginateModel,
  FilterQuery,
  QueryOptions,
  PaginateResult,
  UpdateWriteOpResult,
  Types,
} from 'mongoose';

import { UserEntity } from '../entities/user.entity';
import { JsonType } from '../../common/types/json.type';
import { MongodbQueryResultType } from '../../common/types/mongodb-query-result.type';
import { MongoDeletedQueryResult } from 'src/modules/common/interfaces/mongo-deleted-query-result.interface';

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

  public paginate(
    filter?: FilterQuery<UserEntity>,
    options?: QueryOptions,
  ): Promise<PaginateResult<UserEntity>> {
    return this.model.paginate(filter, options);
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

  public update(
    filter?: FilterQuery<UserEntity>,
    data?: Partial<UserEntity>,
    options?: QueryOptions,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filter, data, options).exec();
  }
  public delete(
    filter?: FilterQuery<UserEntity>,
  ): Promise<MongoDeletedQueryResult> {
    return this.model.deleteOne(filter).exec();
  }

  public getUserData(user: Types.ObjectId): Promise<UserEntity> {
    return this.model
      .findOne({ _id: user })
      .populate('role')
      .populate('account')
      .populate('city')
      .populate('state')
      .exec();
  }
}
