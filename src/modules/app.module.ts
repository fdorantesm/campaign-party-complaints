import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { CoreModule } from './core/core.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ComplaintModule } from './complaint/complaint.module';

@Module({
  imports: [ConfigModule, CoreModule, CommonModule, UserModule, AuthModule, ComplaintModule],
})
export class AppModule {}
