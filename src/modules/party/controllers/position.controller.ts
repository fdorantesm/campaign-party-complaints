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
import { Roles } from 'src/modules/core/decorators/roles.decorator';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CreatePositionDto } from '../dtos/create-position.dto';
import { PositionEntity } from '../entities/position.entity';
import { PositionService } from '../services/position.service';

@Controller('/positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get('/')
  public index(): Promise<PositionEntity[]> {
    return this.positionService.find();
  }

  @Get('/:id')
  public show(@Param('id') _id: Types.ObjectId): Promise<PositionEntity> {
    return this.positionService.findOne({ _id });
  }

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Post('/')
  public create(@Body() complaint: CreatePositionDto): Promise<PositionEntity> {
    return this.positionService.create(complaint);
  }

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Patch('/:id')
  public update(
    @Param('id') _id: Types.ObjectId,
    @Body() complaint: Partial<CreatePositionDto>,
  ): Promise<UpdateWriteOpResult> {
    return this.positionService.update({ _id }, complaint);
  }

  @UseGuards(JwtGuard)
  @Roles('admin')
  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') _id: Types.ObjectId): Promise<void> {
    await this.positionService.delete({ _id });
  }
}
