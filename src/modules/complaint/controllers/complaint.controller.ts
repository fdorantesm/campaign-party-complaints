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
} from '@nestjs/common';
import {
  Types,
  UpdateWriteOpResult,
  PaginateResult,
  FilterQuery,
  QueryOptions,
} from 'mongoose';

import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CreateComplaintDto } from '../dtos/create-complaint.dto';
import { UpdateComplaintDto } from '../dtos/update-complaint.dto';
import { ComplaintEntity } from '../entities/complaint.entity';
import { ComplaintService } from '../services/complaint.service';
import { QueryParser } from '../../core/decorators/query-parser.decorator';
import { BodyParser } from '../../core/decorators/body-parser.decorator';

@UseGuards(JwtGuard)
@Controller('/complaints')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Get('/')
  public index(
    @QueryParser('filter') filter: FilterQuery<ComplaintEntity>,
    @QueryParser('options') options: QueryOptions,
  ): Promise<PaginateResult<ComplaintEntity>> {
    return this.complaintService.find(filter, options);
  }

  @Get('/:id')
  public show(
    @Param('id') _id: Types.ObjectId,
    @QueryParser('options') options: QueryOptions,
  ): Promise<ComplaintEntity> {
    return this.complaintService.findOne({ _id }, options);
  }

  @Post('/')
  public create(
    @BodyParser() complaint: CreateComplaintDto,
    @QueryParser('options') options: QueryOptions,
  ): Promise<ComplaintEntity> {
    return this.complaintService.create(complaint, options);
  }

  @Patch('/:id')
  public update(
    @Param('id') _id: Types.ObjectId,
    @Body() complaint: UpdateComplaintDto,
    @QueryParser('options') options: QueryOptions,
  ): Promise<ComplaintEntity> {
    return this.complaintService.update({ _id }, complaint, options);
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') _id: Types.ObjectId): Promise<void> {
    await this.complaintService.delete({ _id });
  }
}
