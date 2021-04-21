import { Module } from '@nestjs/common';

import { ComplaintController } from './controllers/complaint.controller';

@Module({
  controllers: [ComplaintController],
})
export class ComplaintModule {}
