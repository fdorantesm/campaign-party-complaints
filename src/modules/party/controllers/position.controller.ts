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
import { CreatePositionDto } from '../dtos/create-position.dto';
import { PositionEntity } from '../entities/position.entity';
import { PositionService } from '../services/position.service';

@Controller('/positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get('/')
  public index() {
    return this.positionService.find();
  }

  @Get('/:id')
  public show(@Param('id') _id: Types.ObjectId): Promise<PositionEntity> {
    return this.positionService.findOne({ _id });
  }

  @UseGuards(JwtGuard)
  @Post('/')
  public create(@Body() complaint: CreatePositionDto): Promise<PositionEntity> {
    return this.positionService.create(complaint);
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  public update(
    @Param('id') _id: Types.ObjectId,
    @Body() complaint: Partial<CreatePositionDto>,
  ): Promise<UpdateWriteOpResult> {
    return this.positionService.update({ _id }, complaint);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') _id: Types.ObjectId): Promise<void> {
    await this.positionService.delete({ _id });
  }
}
