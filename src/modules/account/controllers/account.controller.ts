import { PaginateResult, Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';

import { AccountRegistrationDto } from '../dtos/account-registration.dto';
import { AccountEntity } from '../entities/account.entity';
import { AccountService } from '../services/account.service';
import { AdminType } from '../types/admin.type';

import { JwtGuard } from '../../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/')
  public list(): Promise<PaginateResult<AccountEntity>> {
    return this.accountService.find({ public: false });
  }

  @Get('/:id')
  public show(@Param('id') _id: Types.ObjectId): Promise<AccountEntity> {
    return this.accountService.findOne({ _id });
  }

  @Post('/')
  public create(@Body() data: AccountRegistrationDto): Promise<AdminType> {
    return this.accountService.create(data);
  }

  @HttpCode(204)
  @Delete('/:id')
  public delete(@Param('id') _id: Types.ObjectId): Promise<void> {
    return this.accountService.delete({ _id });
  }
}
