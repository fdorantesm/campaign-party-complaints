import { Injectable } from '@nestjs/common';
import { QueryOptions, FilterQuery } from 'mongoose';

import { JsonType } from '../../common/types/json.type';
import { MongodbQueryResultType } from '../../common/types/mongodb-query-result.type';
import { UserStateRepository } from '../repositories/user-state.repository';
import { UserStateEntity } from '../entities/user-state.entity';

@Injectable()
export class UserStateService {
  constructor(private readonly userStateRepository: UserStateRepository) {}

  public findOne(
    filter?: FilterQuery<UserStateEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<UserStateEntity> {
    return this.userStateRepository.findOne(filter, projection, options);
  }

  public create(data: Partial<UserStateEntity>): Promise<UserStateEntity> {
    return this.userStateRepository.create(data);
  }

  public deleteMany(
    filter?: FilterQuery<UserStateEntity>,
    options?: QueryOptions,
  ): Promise<MongodbQueryResultType> {
    return this.userStateRepository.deleteMany(filter, options);
  }
}
