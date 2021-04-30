import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { AccountSeed } from './seeds/account/account.seed';
import { AccountModule } from '../modules/account/account.module';

@Module({
  imports: [CommandModule, AccountModule],
  providers: [AccountSeed],
  exports: [AccountSeed],
})
export class SeedsModule {}
