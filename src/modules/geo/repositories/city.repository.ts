import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FilterQuery,
  PaginateModel,
  PaginateResult,
  QueryOptions,
} from 'mongoose';
import { JsonType } from 'src/modules/common/types/json.type';

import { CityEntity } from '../entities/city.entity';

@Injectable()
export class CityRepository {
  constructor(
    @InjectModel(CityEntity.name)
    private readonly model: PaginateModel<CityEntity>,
  ) {}

  public find(
    filter?: FilterQuery<CityEntity>,
    options?: QueryOptions,
  ): Promise<PaginateResult<CityEntity>> {
    return this.model.paginate(filter, options);
  }

  public findOne(
    filter?: FilterQuery<CityEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options).exec();
  }
}
