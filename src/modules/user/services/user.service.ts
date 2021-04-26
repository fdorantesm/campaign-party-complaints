import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryOptions, FilterQuery, PaginateResult, Types } from 'mongoose';
import { HashService } from 'src/modules/common/services/hash.service';

import { JsonType } from '../../../modules/common/types/json.type';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { JwtConfigType } from '../../config/types/jwt.config.type';
import { MongodbQueryResultType } from '../../common/types/mongodb-query-result.type';
import { CreateAccountUserDto } from '../dtos/create-account-user.dto';
import { option } from 'yargs';
import { MongoDeletedQueryResult } from 'src/modules/common/interfaces/mongo-deleted-query-result.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
  ) {}

  public find(
    filter?: FilterQuery<UserEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<UserEntity[]> {
    return this.userRepository.find(filter, projection, options);
  }

  public paginate(
    filter?: FilterQuery<UserEntity>,
    options?: QueryOptions,
  ): Promise<PaginateResult<UserEntity>> {
    return this.userRepository.paginate(filter, options);
  }

  public findOne(
    filter?: FilterQuery<UserEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<UserEntity> {
    return this.userRepository.findOne(filter, projection, options);
  }

  public async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const userExists = await this.findOne({ email: data.email });
    if (userExists) {
      throw new BadRequestException('EMAIL_ALREADY_REGISTERED');
    }
    const jwt = this.configService.get<JwtConfigType>('jwt');
    const password = await this.hashService.generate(data.password, jwt.salts);
    const row = await this.userRepository.create({ ...data, password });
    return this.findOne({ _id: row._id });
  }

  public deleteMany(
    filter?: FilterQuery<UserEntity>,
    options?: QueryOptions,
  ): Promise<MongodbQueryResultType> {
    return this.userRepository.deleteMany(filter, options);
  }

  public count(filter?: FilterQuery<UserEntity>): Promise<number> {
    return this.userRepository.count(filter);
  }

  public async update(
    filter?: FilterQuery<UserEntity>,
    data?: Partial<UserEntity>,
    options?: QueryOptions,
  ): Promise<UserEntity> {
    const user = await this.findOne({ _id: filter._id });

    if (!user) {
      throw new BadRequestException('INVALID_USER');
    }

    if (data.password) {
      data.password = await this.hash(data.password);
    }

    await this.userRepository.update(
      filter,
      {
        email: data.email,
        name: data.name,
        city: data.city,
        state: data.state,
        phone: data.phone,
        password: data.password,
      },
      options,
    );

    return this.findOne({ _id: user._id });
  }

  public delete(
    filter?: FilterQuery<UserEntity>,
  ): Promise<MongoDeletedQueryResult> {
    return this.userRepository.delete(filter);
  }

  private hash(password: string) {
    const jwt = this.configService.get<JwtConfigType>('jwt');
    return this.hashService.generate(password, jwt.salts);
  }
}
