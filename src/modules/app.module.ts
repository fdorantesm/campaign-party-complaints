import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { CoreModule } from './core/core.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [ConfigModule, CoreModule, CommonModule, UserModule, AccountModule]
})
export class AppModule {}
