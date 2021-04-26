import { Injectable } from '@nestjs/common';
import { FilterQuery, QueryOptions, PaginateResult } from 'mongoose';

import { JsonType } from '../../common/types/json.type';
import { CityEntity } from '../entities/city.entity';
import { CityRepository } from '../repositories/city.repository';

@Injectable()
export class CityService {
  constructor(private readonly repository: CityRepository) {}

  public find(
    filter?: FilterQuery<CityEntity>,
    options?: QueryOptions,
  ): Promise<CityEntity[]> {
    return this.repository.find(filter, options);
  }

  public findOne(
    filter?: FilterQuery<CityEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ) {
    return this.repository.findOne(filter, projection, options);
  }
}
