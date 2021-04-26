import {
  Controller,
  Get,
  UseGuards,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  HttpCode,
  Request,
} from '@nestjs/common';
import { Types, PaginateResult, FilterQuery, QueryOptions } from 'mongoose';

import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CreateComplaintDto } from '../dtos/create-complaint.dto';
import { UpdateComplaintDto } from '../dtos/update-complaint.dto';
import { ComplaintEntity } from '../entities/complaint.entity';
import { ComplaintService } from '../services/complaint.service';
import { QueryParser } from '../../core/decorators/query-parser.decorator';
import { BodyParser } from '../../core/decorators/body-parser.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserScopeGuard } from 'src/modules/auth/guards/user-scope.guard';
import { Scope } from 'src/modules/core/decorators/scope.decorator';
import { AuthRequestType } from 'src/modules/core/types/auth-request.type';

@UseGuards(JwtGuard, RolesGuard)
@Controller('/complaints')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Get('/')
  @Roles('admin', 'customer', 'user')
  @UseGuards(UserScopeGuard)
  @Scope('user')
  public index(
    @QueryParser('filter') filter: FilterQuery<ComplaintEntity>,
    @QueryParser('options') options: QueryOptions,
    @Request() req: AuthRequestType,
  ): Promise<PaginateResult<ComplaintEntity>> {
    return this.complaintService.find(
      { ...filter, user: req.scope.users },
      options,
    );
  }

  @Get('/:id')
  @Roles('admin', 'customer', 'user')
  @Scope('user')
  @UseGuards(UserScopeGuard)
  public show(
    @Param('id') _id: Types.ObjectId,
    @QueryParser('options') options: QueryOptions,
    @Request() req: AuthRequestType,
  ): Promise<ComplaintEntity> {
    return this.complaintService.findOne(
      { _id, user: req.scope.users },
      options,
    );
  }

  @Post('/')
  @Roles('admin', 'customer', 'user')
  public create(
    @Body() complaint: CreateComplaintDto,
  ): Promise<ComplaintEntity> {
    return this.complaintService.create(complaint);
  }

  @Patch('/:id')
  @Roles('admin', 'customer', 'user')
  @Scope('user')
  @UseGuards(UserScopeGuard)
  public update(
    @Param('id') _id: Types.ObjectId,
    @Body() complaint: UpdateComplaintDto,
    @QueryParser('options') options: QueryOptions,
    @Request() req: AuthRequestType,
  ): Promise<ComplaintEntity> {
    return this.complaintService.update(
      { _id, user: req.scope.users },
      complaint,
      options,
    );
  }

  @Delete('/:id')
  @HttpCode(204)
  @Roles('admin', 'customer', 'user')
  @Scope('user')
  @UseGuards(UserScopeGuard)
  public async delete(
    @Param('id') _id: Types.ObjectId,
    @Request() req: AuthRequestType,
  ): Promise<void> {
    await this.complaintService.delete({ _id, user: req.scope.users });
  }
}
