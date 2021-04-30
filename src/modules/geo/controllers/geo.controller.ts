import { Controller, Get, Param } from '@nestjs/common';
import { Types } from 'mongoose';

import { CityEntity } from '../entities/city.entity';
import { StateEntity } from '../entities/state.entity';
import { CityService } from '../services/city.service';
import { StateService } from '../services/state.service';

@Controller('/geo')
export class GeoController {
  constructor(
    private readonly cityService: CityService,
    private readonly stateService: StateService,
  ) {}

  @Get('/states')
  public states(): Promise<StateEntity[]> {
    return this.stateService.find();
  }

  @Get('/states/:state/cities')
  public cities(@Param('state') state: Types.ObjectId): Promise<CityEntity[]> {
    return this.cityService.find({ state: Types.ObjectId(state.toString()) });
  }
}
