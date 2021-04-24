import { CasbinService } from '@app/casbin';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PolicyTypeWithDomain } from '../../core/types/policy.type';

@Controller('/casbin')
export class CasbinController {
  constructor(private readonly nestCasbinService: CasbinService) {}

  @Get('get-all-subjects')
  public getAllSubjects() {
    return this.nestCasbinService.getAllSubjects();
  }

  @Get('get-all-objects')
  public getAllObjects() {
    return this.nestCasbinService.getAllObjects();
  }

  //   @Get('get-all-named-objects')
  //   public getAllNamedObjects() {
  //     return this.nestCasbinService.getAllNamedObjects('p');
  //   }

  @Get('/get-all-roles')
  public getAllRoles() {
    return this.nestCasbinService.getAllRoles();
  }

  //   @Get('/get-all-named-roles')
  //   public getAllNamedRoles() {
  //     return this.nestCasbinService.getAllNamedRoles('g');
  //   }

  @Get('/get-policy')
  public async getPolicy() {
    return await this.nestCasbinService.getPolicy();
  }

  //   @Post('/get-filtered-by-policy')
  //   public async getFilteredPolicy(@Body() data) {
  //     return await this.nestCasbinService.getFilteredPolicy(0, data.sub);
  //   }

  @Get('/get-named-policy')
  public async getNamedPolicy() {
    return this.nestCasbinService.getNamedPolicy('p');
  }

  //   @Post('get-filtered-named-by-policy')
  //   public getFilteredNamedPolicy(@Body() data: any) {
  //     return this.nestCasbinService.getFilteredNamedPolicy('p', 0, data.sub);
  //   }

  //   @Post('get-grouping-policy')
  //   public getGroupingPolicy(@Body() data: any) {
  //     return this.nestCasbinService.getGroupingPolicy('p', 0, data.sub);
  //   }

  //   @Post('get-filtered-grouping-policy')
  //   public getFilteredGroupingPolicy(@Body() data: any) {
  //     return this.nestCasbinService.getFilteredGroupingPolicy(0, data.sub);
  //   }

  //   @Post('get-filtered-grouping-policy')
  //   public getNamedGroupingPolicy(@Body() data: any) {
  //     return this.nestCasbinService.getNamedGroupingPolicy('g');
  //   }

  //   @Post('get-filtered-grouping-policy')
  //   public getFilteredNamedGroupingPolicy(@Body() data: any) {
  //     return this.nestCasbinService.getFilteredNamedGroupingPolicy(
  //       'g',
  //       0,
  //       'ferd',
  //     );
  //   }

  @Post('/has-policy')
  public async hasPolicy(@Body() data: any) {
    return this.nestCasbinService.hasPolicy(
      data.sub,
      data.dom,
      data.obj,
      data.act,
    );
  }

  @Post('/has-named-policy')
  public async hasNamedPolicy(@Body() data: any) {
    return this.nestCasbinService.hasNamedPolicy(
      'p',
      data.sub,
      data.obj,
      data.act,
      data.dom,
    );
  }

  @Post('/add-policy')
  public async addPolicy(@Body() data: PolicyTypeWithDomain) {
    return await this.nestCasbinService.addPolicy(
      data.sub,
      data.dom,
      data.obj,
      data.act,
    );
  }

  //   @Post('/add-policies')
  //   public async addPolicies(@Body() data: any) {
  //     return await this.nestCasbinService.addPolicies(
  //       ['jack', 'data4', 'read'],
  //       ['katy', 'data4', 'write'],
  //       ['leyo', 'data4', 'read'],
  //       ['ham', 'data4', 'write'],
  //     );
  //   }

  //   @Post('add-named-policy')
  //   public addNamedPolicy() {
  //     return this.nestCasbinService.addNamedPolicy('p', 'ferd', 'cdmx', 'read'));
  //   }

  //   @Post('/add-named-policies')
  //   public async addNamedPolicies(@Body() data: any) {
  //     return await this.nestCasbinService.addNamedPolicies(
  //       ['jack', 'data4', 'read'],
  //       ['katy', 'data4', 'write'],
  //       ['leyo', 'data4', 'read'],
  //       ['ham', 'data4', 'write'],
  //     );
  //   }

  @Get('remove-policy')
  public removePolicy() {
    return this.nestCasbinService.removePolicy('alice', 'data1', 'read');
  }

  @Get('get-all-actions')
  public getAllActions() {
    return this.nestCasbinService.getAllActions();
  }

  //   @Get('get-all-named-actions')
  //   public getAllNamedActions() {
  //     return this.nestCasbinService.getAllNamedActions();
  //   }

  @Get('get-all-named-subjects')
  public getAllNamedSubjects() {
    return this.nestCasbinService.getAllSubjects();
  }

  /**
   * Tambien este está bien
   */
  @Post('/add-role-for-user')
  public async userRole(@Body() data: any) {
    return await this.nestCasbinService.addRoleForUser(
      data.sub,
      data.role,
      data.dom,
    );
  }

  @Post('/has-permission-for-user')
  public async hasPermissionForUser(@Body() data: any) {
    return this.nestCasbinService.hasPermissionForUser('admin', 'read');
  }

  /**
   * Esta bien
   */
  @Post('/has-role-for-user')
  public async hasRoleForUser(@Body() data: any) {
    return this.nestCasbinService.hasRoleForUser(data.sub, data.role, data.dom);
  }

  @Post('/get-users-for-role')
  public async getUsersForRole(@Body() data: any) {
    return this.nestCasbinService.getUsersForRole(data.sub, data.dom);
  }

  @Post('/add-grouping-policy')
  public async addGroupingPolicy(@Body() data: any) {
    return this.nestCasbinService.addGroupingPolicy(data.sub, data.dom);
  }

  @Post('/enforce')
  public async enforce(@Body() data: any) {
    return await this.nestCasbinService.enforce(
      data.sub,
      data.dom,
      data.obj,
      data.act,
    );
  }
}
