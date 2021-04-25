import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PartyEntity, PartySchema } from './entities/party.entity';
import { PositionEntity, PositionSchema } from './entities/position.entity';
import { PartyRepository } from './repositories/party.repository';
import { PositionRepository } from './repositories/position.repository';
import { PartyService } from './services/party.service';
import { PositionService } from './services/position.service';
import { PartyController } from './controllers/party.controller';
import { PositionController } from './controllers/position.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PartyEntity.name, schema: PartySchema },
      { name: PositionEntity.name, schema: PositionSchema },
    ]),
  ],
  providers: [
    PartyService,
    PartyRepository,
    PositionService,
    PositionRepository,
  ],
  exports: [PartyService, PositionService],
  controllers: [PartyController, PositionController],
})
export class PartyModule {}
