import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CityEntity, CitySchema } from './entities/city.entity';
import { StateSchema, StateEntity } from './entities/state.entity';
import { HashService } from './services/hash.service';
import { ApiKeyService } from './services/apikey.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StateEntity.name, schema: StateSchema },
      { name: CityEntity.name, schema: CitySchema },
    ]),
  ],
  providers: [HashService, ApiKeyService],
  exports: [HashService, ApiKeyService],
})
export class CommonModule {}
