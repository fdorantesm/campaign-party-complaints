import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Patch,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { FilterQuery, PaginateResult, QueryOptions, Types } from 'mongoose';

import { RolesGuard } from '../../auth/guards/roles.guard';
import { ComplaintEntity } from '../../complaint/entities/complaint.entity';
import { QueryParser } from '../../core/decorators/query-parser.decorator';
import { Roles } from '../../core/decorators/roles.decorator';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { Body } from '@nestjs/common';
import { AddUserDto } from 'src/modules/user/dtos/add-user.dto';
import { AuthRequestType } from 'src/modules/core/types/auth-request.type';
import { UpdateUserDto } from 'src/modules/user/dtos/update-user.dto';
import { RoleService } from 'src/modules/user/services/role.service';

@UseGuards(JwtGuard)
@Controller('/accounts/:account/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Roles('admin', 'customer')
  @UseGuards(RolesGuard)
  @Get('/')
  public index(
    @QueryParser('filter') filter: FilterQuery<ComplaintEntity>,
    @QueryParser('options') options: QueryOptions,
    @Param('account') account: Types.ObjectId,
  ): Promise<PaginateResult<UserEntity>> {
    const accountId = Types.ObjectId(account.toString());
    return this.userService.paginate(
      { ...filter, account: accountId },
      options,
    );
  }

  @Get('/:user')
  public show(
    @QueryParser('filter') filter: FilterQuery<ComplaintEntity>,
    @Param('user') _id: Types.ObjectId,
  ): Promise<UserEntity> {
    return this.userService.findOne({ _id });
  }

  @Roles('admin', 'customer')
  @UseGuards(RolesGuard)
  @Post('/')
  public async createUser(
    @Body() user: AddUserDto,
    @Request() req: AuthRequestType,
  ): Promise<UserEntity> {
    const role = await this.roleService.findOne({ code: 'USER' });
    return this.userService.create({
      ...user,
      account: req.user.account,
      role: role._id,
    });
  }

  @Roles('admin', 'customer')
  @UseGuards(RolesGuard)
  @Patch('/:user')
  public updateUser(
    @Param('user') user: Types.ObjectId,
    @Body() data: UpdateUserDto,
    @QueryParser('options') options: QueryOptions,
    @Request() req: AuthRequestType,
  ): Promise<UserEntity> {
    return this.userService.update({ _id: user }, data, options);
  }

  @HttpCode(204)
  @Delete('/:user')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'customer')
  public async delete(@Param('user') _id: Types.ObjectId): Promise<void> {
    await this.userService.delete({ _id });
  }
}
