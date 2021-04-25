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
import { PartyEntity } from '../entities/party.entity';
import { PartyRepository } from '../repositories/party.repository';

@Injectable()
export class PartyService {
  constructor(private readonly repository: PartyRepository) {}

  public find(
    filter?: FilterQuery<PartyEntity>,
    options?: QueryOptions,
  ): Promise<PaginateResult<PartyEntity>> {
    return this.repository.find(filter, options);
  }

  public findOne(
    filter?: FilterQuery<PartyEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ) {
    return this.repository.findOne(filter, projection, options);
  }

  public create(data: Partial<PartyEntity>) {
    return this.repository.create(data);
  }

  public update(
    filter: FilterQuery<PartyEntity>,
    data: UpdateQuery<PartyEntity>,
    options?: QueryOptions,
  ): Promise<UpdateWriteOpResult> {
    return this.repository.update(filter, data, options);
  }

  public delete(
    filter: FilterQuery<PartyEntity>,
  ): Promise<MongodbQueryResultType> {
    return this.repository.delete(filter);
  }
}
