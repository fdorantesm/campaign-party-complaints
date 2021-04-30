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
import { AccountBootstrapDto } from '../dtos/account-start.dto';
import { RoleService } from '../../user/services/role.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly repository: AccountRepository,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
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
      throw new ConflictException('El correo ya está registrado');
    }

    const customerRole = await this.roleService.findOne({ code: 'CUSTOMER' });

    const base: any = {
      state: data.state,
      city: data.city,
    };

    const account = await this.repository.create({
      ...base,
      name: data.account,
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
      role: customerRole._id,
    });
    return { account, user };
  }

  public async seed(data: AccountSeederDto): Promise<AccountEntity> {
    const account = await this.repository.create(data);
    return account;
  }

  public async init(data: AccountBootstrapDto): Promise<AdminType> {
    try {
      const account = await this.repository.create({
        name: data.account,
      });

      try {
        const roles = await this.roleService.seed([
          { name: 'Administrador', code: 'ADMIN' },
          { name: 'Cliente', code: 'CUSTOMER' },
          { name: 'Usuario', code: 'USER' },
        ]);
        const adminRole = roles.find((role) => role.code === 'ADMIN');

        const user = await this.userService.create({
          account: account._id,
          name: data.name,
          email: data.email,
          password: data.password,
          enabled: true,
          owner: true,
          role: adminRole._id,
        });
        return { account, user };
      } catch (err) {
        throw new InternalServerErrorException(
          'Oops, hubo un problema al procesar la petición',
        );
      }
    } catch {
      throw new InternalServerErrorException(
        'Oops, hubo un problema al procesar la petición',
      );
    }
  }

  public async delete(
    filter?: FilterQuery<AccountEntity>,
    options?: QueryOptions,
  ): Promise<void> {
    const account = await this.repository.findOne(filter);
    if (!account) {
      throw new NotFoundException('La cuenta no existe');
    }
    const result = await this.repository.delete(filter, options);
    if (result.ok && result.deletedCount > 0) {
      await this.userService.deleteMany({ account: account._id }, options);
    }
    throw new Error('Oops, hubo un problema al procesar la petición');
  }
}
