import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FilterQuery,
  PaginateModel,
  PaginateResult,
  QueryOptions,
} from 'mongoose';
import { JsonType } from 'src/modules/common/types/json.type';

import { StateEntity } from '../entities/state.entity';

@Injectable()
export class StateRepository {
  constructor(
    @InjectModel(StateEntity.name)
    private readonly model: PaginateModel<StateEntity>,
  ) {}

  public find(
    filter?: FilterQuery<StateEntity>,
    options?: QueryOptions,
  ): Promise<PaginateResult<StateEntity>> {
    return this.model.paginate(filter, options);
  }

  public findOne(
    filter?: FilterQuery<StateEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options).exec();
  }
}
