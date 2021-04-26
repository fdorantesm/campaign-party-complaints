import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PaginateResult, QueryOptions } from 'mongoose';
import { JsonType } from 'src/modules/common/types/json.type';

import { StateEntity } from '../entities/state.entity';

@Injectable()
export class StateRepository {
  constructor(
    @InjectModel(StateEntity.name)
    private readonly model: Model<StateEntity>,
  ) {}

  public find(
    filter?: FilterQuery<StateEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<StateEntity[]> {
    return this.model.find(filter, projection, options).exec();
  }

  public findOne(
    filter?: FilterQuery<StateEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options).exec();
  }
}
