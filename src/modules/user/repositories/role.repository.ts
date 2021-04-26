import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, FilterQuery, QueryOptions } from 'mongoose';

import { JsonType } from '../../common/types/json.type';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly model: PaginateModel<RoleEntity>,
  ) {}

  public find(
    filter?: FilterQuery<RoleEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<RoleEntity[]> {
    return this.model.find(filter, projection, options).exec();
  }

  public findOne(
    filter?: FilterQuery<RoleEntity>,
    projection?: JsonType,
    options?: QueryOptions,
  ): Promise<RoleEntity> {
    return this.model.findOne(filter, projection, options).exec();
  }

  public insertMany(roles: CreateRoleDto[]): Promise<RoleEntity[]> {
    return this.model.insertMany(roles);
  }
}
