import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from '../../user/services/role.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector
      .get<string[]>('roles', context.getHandler())
      .map((role) => role.toLocaleLowerCase());
    const user = request.user;

    if (!roles) {
      return false;
    }

    const role = await this.roleService.findOne({ _id: user?.role });
    return roles.includes(role?.code?.toLocaleLowerCase());
  }
}
