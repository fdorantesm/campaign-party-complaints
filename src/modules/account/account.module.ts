import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountRepository } from './repositories/account.repository';
import { AccountService } from './services/account.service';
import { AccountEntity, AccountSchema } from './entities/account.entity';
import { UserModule } from '../user/user.module';
import { AccountController } from './controllers/account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountEntity.name, schema: AccountSchema },
    ]),
    UserModule,
  ],
  providers: [AccountRepository, AccountService],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
