import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryOptions, FilterQuery } from 'mongoose';
import { HashService } from 'src/modules/common/services/hash.service';

import { JsonType } from '../../../modules/common/types/json.type';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { JwtConfigType } from '../../config/types/jwt.config.type';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
  ) {}

  public findOne(
    filter?: FilterQuery<UserEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<UserEntity> {
    return this.userRepository.findOne(filter, projection, options);
  }

  public async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const jwt = this.configService.get<JwtConfigType>('jwt');
    const password = await this.hashService.generate(data.password, jwt.salts);
    const row = await this.userRepository.create({ ...data, password });
    return this.findOne({ _id: row._id });
  }
}
