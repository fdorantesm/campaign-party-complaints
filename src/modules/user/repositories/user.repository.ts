import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, FilterQuery, QueryOptions } from 'mongoose';

import { UserEntity } from '../entities/user.entity';
import { JsonType } from '../../common/types/json.type';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly model: PaginateModel<UserEntity>,
  ) {}

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
}
