import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserEntity, UserSchema } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { CommonModule } from '../common/common.module';
import { UserStateEntity, UserStateSchema } from './entities/user-state.entity';
import { UserStateRepository } from './repositories/user-state.repository';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repositories/role.repository';
import { RoleEntity, RoleSchema } from './entities/role.entity';
import { UserStateService } from './services/user-state.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserSchema },
      { name: UserStateEntity.name, schema: UserStateSchema },
      { name: RoleEntity.name, schema: RoleSchema },
    ]),
    CommonModule,
  ],
  providers: [
    RoleRepository,
    UserRepository,
    UserStateRepository,
    UserService,
    RoleService,
    UserStateService,
  ],
  exports: [UserService, RoleService, UserStateService],
})
export class UserModule {}
