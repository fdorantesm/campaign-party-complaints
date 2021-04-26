import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GeoController } from './controllers/geo.controller';
import { CityEntity, CitySchema } from './entities/city.entity';
import { StateEntity, StateSchema } from './entities/state.entity';
import { CityRepository } from './repositories/city.repository';
import { StateRepository } from './repositories/state.repository';
import { CityService } from './services/city.service';
import { StateService } from './services/state.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StateEntity.name, schema: StateSchema },
      { name: CityEntity.name, schema: CitySchema },
    ]),
  ],
  providers: [StateService, CityService, StateRepository, CityRepository],
  exports: [StateService, CityService],
  controllers: [GeoController],
})
export class GeoModule {}
