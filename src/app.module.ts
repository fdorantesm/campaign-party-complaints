import { Module } from '@nestjs/common';

import { ConfigModule } from './modules/config/config.module';
import { CoreModule } from './modules/core/core.module';
import { CommonModule } from './modules/common/common.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ComplaintModule } from './modules/complaint/complaint.module';
import { AccountModule } from './modules/account/account.module';
import { SeedsModule } from './commands/seeds/seed.module';
import { PartyModule } from './modules/party/party.module';
import { FileModule } from './modules/file/file.module';
import { UploadModule } from './modules/upload/upload.module';
import { GeoModule } from './modules/geo/geo.module';

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
    PartyModule,
    FileModule,
    UploadModule,
    GeoModule,
  ],
})
export class AppModule {}
