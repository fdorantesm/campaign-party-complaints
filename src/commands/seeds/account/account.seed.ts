/* eslint-disable prettier/prettier */
import { Command, Positional } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';

import { AccountService } from '../../../modules/account/services/account.service';

@Injectable()
export class AccountSeed {
  constructor(private readonly account: AccountService) {}

  @Command({
    command: 'create:account',
    describe: 'create an account',
    autoExit: true,
  })
  async create(
    @Positional({ name: 'account', describe: 'Account name', type: 'string' })
    account: string,
    @Positional({
      name: 'public',
      describe: 'Set private if is a customer account',
      type: 'boolean',
    })
    isPublic: string,
  ) {
    const accountResult = await this.account.seed({
      name: account || 'Default',
      public: isPublic === 'true' || true,
    });
    Logger.log(accountResult.name, 'Account Created');
  }
}
