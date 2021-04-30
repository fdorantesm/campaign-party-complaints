import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ComplaintController } from './controllers/complaint.controller';
import { ComplaintSchema, ComplaintEntity } from './entities/complaint.entity';
import { ComplaintService } from './services/complaint.service';
import { ComplaintRepository } from './repositories/complaint.repository';
import { GeoModule } from '../geo/geo.module';
import { FileModule } from '../file/file.module';
import { UserModule } from '../user/user.module';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ComplaintEntity.name, schema: ComplaintSchema },
    ]),
    GeoModule,
    FileModule,
    UserModule,
    AccountModule,
  ],
  controllers: [ComplaintController],
  providers: [ComplaintService, ComplaintRepository],
  exports: [ComplaintService],
})
export class ComplaintModule {}
