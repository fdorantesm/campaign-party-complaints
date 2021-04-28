import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
import { PartyEntity } from '../entities/party.entity';

@Injectable()
export class PartyRepository {
  constructor(
    @InjectModel(PartyEntity.name)
    private readonly model: PaginateModel<PartyEntity>,
  ) {}

  public find(
    filter?: FilterQuery<PartyEntity>,
    options?: QueryOptions,
  ): Promise<PartyEntity[]> {
    return this.model.find(filter, options).exec();
  }

  public findOne(
    filter?: FilterQuery<PartyEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options).exec();
  }

  public create(data: Partial<PartyEntity>) {
    return this.model.create(data);
  }

  public update(
    filter: FilterQuery<PartyEntity>,
    data: UpdateQuery<PartyEntity>,
    options?: QueryOptions,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filter, data, options).exec();
  }

  public delete(
    filter: FilterQuery<PartyEntity>,
  ): Promise<MongodbQueryResultType> {
    return this.model.deleteOne(filter).exec();
  }
}
