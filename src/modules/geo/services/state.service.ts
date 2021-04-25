import { Injectable } from '@nestjs/common';
import { FilterQuery, QueryOptions, PaginateResult } from 'mongoose';

import { JsonType } from '../../common/types/json.type';
import { StateEntity } from '../entities/state.entity';
import { StateRepository } from '../repositories/state.repository';

@Injectable()
export class StateService {
  constructor(private readonly repository: StateRepository) {}

  public find(
    filter?: FilterQuery<StateEntity>,
    options?: QueryOptions,
  ): Promise<PaginateResult<StateEntity>> {
    return this.repository.find(filter, options);
  }

  public findOne(
    filter?: FilterQuery<StateEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ) {
    return this.repository.findOne(filter, projection, options);
  }
}
