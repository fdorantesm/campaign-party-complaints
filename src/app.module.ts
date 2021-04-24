import { Module } from '@nestjs/common';

import { ConfigModule } from './modules/config/config.module';
import { CoreModule } from './modules/core/core.module';
import { CommonModule } from './modules/common/common.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ComplaintModule } from './modules/complaint/complaint.module';
import { AccountModule } from './modules/account/account.module';
import { SeedsModule } from './commands/seeds/seed.module';
import { AclModule } from './modules/acl/acl.module';

@Module({
  imports: [
    SeedsModule,
    ConfigModule,
    CoreModule,
    CommonModule,
    UserModule,
    AuthModule,
    ComplaintModule,
    AccountModule,
    AclModule,
  ],
})
export class AppModule {}
