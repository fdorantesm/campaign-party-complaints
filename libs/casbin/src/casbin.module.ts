import { DynamicModule, Module } from '@nestjs/common';
import { NestCasbinCoreModule } from './nest-casbin-core.module';
import {
  NestCasbinModuleAsyncOptions,
  NestCasbinModuleOptions,
} from './interfaces/nest-casbin.interface';

@Module({})
export class CasbinModule {
  public static register(options: NestCasbinModuleOptions): DynamicModule {
    return {
      module: CasbinModule,
      imports: [NestCasbinCoreModule.register(options)],
    };
  }

  public static registerAsync(
    options: NestCasbinModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: CasbinModule,
      imports: [NestCasbinCoreModule.registerAsync(options)],
    };
  }
}
