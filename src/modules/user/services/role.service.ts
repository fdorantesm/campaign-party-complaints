import { Injectable } from '@nestjs/common';
import { QueryOptions, FilterQuery } from 'mongoose';

import { JsonType } from '../../common/types/json.type';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { RoleEntity } from '../entities/role.entity';
import { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  public find(
    filter?: FilterQuery<RoleEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<RoleEntity[]> {
    return this.repository.find(filter, projection, options);
  }

  public findOne(
    filter?: FilterQuery<RoleEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<RoleEntity> {
    return this.repository.findOne(filter, projection, options);
  }

  public seed(roles: CreateRoleDto[]): Promise<RoleEntity[]> {
    return this.repository.insertMany(roles);
  }
}
