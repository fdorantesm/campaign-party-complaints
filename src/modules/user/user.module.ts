import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserEntity, UserSchema } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { CommonModule } from '../common/common.module';
import { UserStateEntity, UserStateSchema } from './entities/user-state.entity';
import { UserStateRepository } from './repositories/user-state.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserSchema },
      { name: UserStateEntity.name, schema: UserStateSchema },
    ]),
    CommonModule,
  ],
  providers: [UserService, UserRepository, UserStateRepository],
  exports: [UserService],
})
export class UserModule {}
