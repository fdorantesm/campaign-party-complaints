import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { TokenEntity } from '../entities/token.entity';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(TokenEntity.name)
    private readonly model: Model<TokenEntity>,
  ) {}

  public find(filter: FilterQuery<TokenEntity>): Promise<TokenEntity> {
    return this.model.findOne(filter).exec();
  }

  public create(token: Partial<TokenEntity>): Promise<TokenEntity> {
    return this.model.create(token);
  }
}
