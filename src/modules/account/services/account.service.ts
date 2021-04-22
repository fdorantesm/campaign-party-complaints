import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FilterQuery, PaginateResult, QueryOptions } from 'mongoose';
import { JsonType } from 'src/modules/common/types/json.type';

import { AccountEntity } from '../entities/account.entity';
import { AccountRepository } from '../repositories/account.repository';
import { UserService } from '../../user/services/user.service';
import { AccountRegistrationDto } from '../dtos/account-registration.dto';
import { UserEntity } from '../../user/entities/user.entity';
import { AdminType } from '../types/admin.type';
import { AccountSeederDto } from '../dtos/account-seeder.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly repository: AccountRepository,
    private readonly userService: UserService,
  ) {}

  public find(
    filter?: FilterQuery<AccountEntity>,
    options?: QueryOptions,
  ): Promise<PaginateResult<AccountEntity>> {
    return this.repository.find(filter, options);
  }

  public findOne(
    filter?: FilterQuery<AccountEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<AccountEntity> {
    return this.repository.findOne(filter, projection, options);
  }

  public async create(data: AccountRegistrationDto): Promise<AdminType> {
    const userExists = await this.userService.findOne({ email: data.email });

    if (userExists) {
      throw new ConflictException('EMAIL_ALREADY_REGISTERED');
    }

    const base: any = {
      state: data.state,
      city: data.city,
    };
    const account = await this.repository.create({
      ...base,
      name: data.name,
    });
    const user = await this.userService.create({
      ...base,
      name: data.name,
      owner: true,
      account: account._id,
      email: data.email,
      phone: data.phone,
      enabled: true,
      password: data.password,
    });
    return { account, user };
  }

  public async seed(data: AccountSeederDto): Promise<AccountEntity> {
    const account = await this.repository.create(data);
    return account;
  }

  public async delete(
    filter?: FilterQuery<AccountEntity>,
    options?: QueryOptions,
  ): Promise<void> {
    const account = await this.repository.findOne(filter);
    if (!account) {
      throw new NotFoundException('ACCOUNT_NOT_FOUND');
    }
    const result = await this.repository.delete(filter, options);
    if (result.ok && result.deletedCount > 0) {
      await this.userService.deleteMany({ account: account._id }, options);
    }
    throw new Error('INTERNAL_SERVER_ERROR');
  }
}
