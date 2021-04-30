import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { TokenEntity } from '../entities/token.entity';
import { TokenRepository } from '../repositories/token.repository';

@Injectable()
export class TokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  public find(filter: FilterQuery<TokenEntity>): Promise<TokenEntity> {
    return this.tokenRepository.find(filter);
  }

  public create(token: Partial<TokenEntity>): Promise<TokenEntity> {
    return this.tokenRepository.create(token);
  }
}
