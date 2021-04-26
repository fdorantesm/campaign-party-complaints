import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FilterQuery,
  PaginateModel,
  PaginateResult,
  QueryOptions,
} from 'mongoose';

import { JsonType } from '../../common/types/json.type';
import { MongodbQueryResultType } from '../../common/types/mongodb-query-result.type';
import { AccountBootstrapDto } from '../dtos/account-start.dto';
import { AccountEntity } from '../entities/account.entity';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(AccountEntity.name)
    private readonly model: PaginateModel<AccountEntity>,
  ) {}

  public find(
    filter?: FilterQuery<AccountEntity>,
    options?: QueryOptions,
  ): Promise<PaginateResult<AccountEntity>> {
    return this.model.paginate(filter, options);
  }

  public findOne(
    filter?: FilterQuery<AccountEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<AccountEntity> {
    return this.model.findOne(filter, projection, options).exec();
  }

  public create(data: Partial<AccountEntity>): Promise<AccountEntity> {
    return this.model.create(data);
  }

  public delete(
    filter?: FilterQuery<AccountEntity>,
    options?: QueryOptions,
  ): Promise<MongodbQueryResultType> {
    return this.model.deleteOne(filter, options).exec();
  }
}
