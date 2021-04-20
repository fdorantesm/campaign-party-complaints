import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { options } from '../config/options/config.options';

@Module({
  imports: [ConfigModule.forRoot(options)],
})
export class CoreModule {}
