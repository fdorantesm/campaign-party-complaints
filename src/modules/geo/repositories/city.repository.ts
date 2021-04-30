import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FilterQuery,
  Model,
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
    private readonly model: Model<CityEntity>,
  ) {}

  public find(
    filter?: FilterQuery<CityEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<CityEntity[]> {
    return this.model.find(filter, projection, options).exec();
  }

  public findOne(
    filter?: FilterQuery<CityEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options).exec();
  }
}
