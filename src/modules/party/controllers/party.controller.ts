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
import { Types, UpdateWriteOpResult } from 'mongoose';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CreatePartyDto } from '../dtos/create-party.dto';
import { PartyEntity } from '../entities/party.entity';
import { PartyService } from '../services/party.service';

@Controller('/parties')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Get('/')
  public index() {
    return this.partyService.find();
  }

  @Get('/:id')
  public show(@Param('id') _id: Types.ObjectId): Promise<PartyEntity> {
    return this.partyService.findOne({ _id });
  }

  @UseGuards(JwtGuard)
  @Post('/')
  public create(@Body() complaint: CreatePartyDto): Promise<PartyEntity> {
    return this.partyService.create(complaint);
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  public update(
    @Param('id') _id: Types.ObjectId,
    @Body() complaint: Partial<CreatePartyDto>,
  ): Promise<UpdateWriteOpResult> {
    return this.partyService.update({ _id }, complaint);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') _id: Types.ObjectId): Promise<void> {
    await this.partyService.delete({ _id });
  }
}
