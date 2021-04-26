import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { PaginateResult, Types } from 'mongoose';

import { AccountRegistrationDto } from '../dtos/account-registration.dto';
import { AccountEntity } from '../entities/account.entity';
import { AccountService } from '../services/account.service';
import { AdminType } from '../types/admin.type';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/core/decorators/roles.decorator';
import { BodyParser } from 'src/modules/core/decorators/body-parser.decorator';

@UseGuards(JwtGuard)
@Controller('/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  public list(): Promise<PaginateResult<AccountEntity>> {
    return this.accountService.find({ public: false });
  }

  @Get('/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  public show(@Param('id') _id: Types.ObjectId): Promise<AccountEntity> {
    return this.accountService.findOne({ _id });
  }

  @Post('/')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  public create(@Body() data: AccountRegistrationDto): Promise<AdminType> {
    return this.accountService.create(data);
  }

  @HttpCode(204)
  @Delete('/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  public delete(@Param('id') _id: Types.ObjectId): Promise<void> {
    return this.accountService.delete({ _id });
  }
}
