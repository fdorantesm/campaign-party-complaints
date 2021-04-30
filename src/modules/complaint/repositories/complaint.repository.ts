import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PaginateModel,
  QueryOptions,
  FilterQuery,
  PaginateResult,
  UpdateWriteOpResult,
} from 'mongoose';

import { ComplaintEntity } from '../entities/complaint.entity';
import { JsonType } from '../../common/types/json.type';
import { MongodbQueryResultType } from '../../common/types/mongodb-query-result.type';
import { QueryParserOptionsInterface } from '../../core/interfaces/query-parser.interface';
import { CreateComplaintDto } from '../dtos/create-complaint.dto';

@Injectable()
export class ComplaintRepository {
  constructor(
    @InjectModel(ComplaintEntity.name)
    private readonly model: PaginateModel<ComplaintEntity>,
  ) {}

  public find(
    filter?: FilterQuery<ComplaintEntity>,
    options?: QueryOptions,
  ): Promise<PaginateResult<ComplaintEntity>> {
    return this.model.paginate(filter, options);
  }

  public findOne(
    filter?: FilterQuery<ComplaintEntity>,
    options?: QueryOptions,
  ): Promise<ComplaintEntity> {
    const query = this.model.findOne(filter);
    if (options) {
      query.populate(options.populate);
      query.setOptions({
        limit: options.limit,
        lean: options.lean,
        projection: options.projection,
      });
    }
    return query.exec();
  }

  public create(data: Partial<ComplaintEntity>) {
    return this.model.create(data);
  }

  public update(
    filter: FilterQuery<ComplaintEntity>,
    data: Partial<ComplaintEntity>,
    options?: QueryOptions,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filter, data, options).exec();
  }

  public delete(
    filter: FilterQuery<ComplaintEntity>,
  ): Promise<MongodbQueryResultType> {
    return this.model.deleteOne(filter).exec();
  }
}
