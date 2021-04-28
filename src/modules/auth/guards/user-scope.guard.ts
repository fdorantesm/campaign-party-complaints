import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from '../../user/services/role.service';
import { UserService } from '../../user/services/user.service';
import { Types } from 'mongoose';
import { AccountService } from 'src/modules/account/services/account.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class UserScopeGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly accountService: AccountService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const role = await this.roleService.findOne({ _id: user?.role });
    const userRole = role?.code?.toLocaleLowerCase();
    const userAccount = await this.accountService.findOne({
      _id: request.user.account,
    });
    const isPublicAccount = userAccount.public && userAccount.name === 'Public';

    request.scope = {};

    switch (userRole) {
      case 'user': {
        if (!isPublicAccount) {
          const users = await this.getScopeUsers(request.user.account);
          request.scope.users = users.map((user) => user._id);
        } else {
          request.scope.users = [request.user.id];
        }
        break;
      }
      case 'customer': {
        const users = await this.getScopeUsers(request.user.account);
        request.scope.users = users.map((user) => user._id);
        break;
      }
      case 'admin': {
        request.scope.users = { $exists: true };
      }
    }

    return true;
  }

  private getScopeUsers(account?: Types.ObjectId): Promise<UserEntity[]> {
    const filter: any = {};
    if (account) {
      filter.account = account;
    }
    return this.userService.find(filter, { _id: 1 });
  }
}
