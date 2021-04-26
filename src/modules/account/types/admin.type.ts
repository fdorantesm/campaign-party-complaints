import { LeanDocument } from 'mongoose';

import { UserEntity } from '../../user/entities/user.entity';
import { AccountEntity } from '../entities/account.entity';

export type AdminType = {
  account: AccountEntity | LeanDocument<AccountEntity>;
  user: UserEntity | LeanDocument<UserEntity>;
};
