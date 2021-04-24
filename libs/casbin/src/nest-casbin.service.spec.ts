import { Test, TestingModule } from '@nestjs/testing';
import { CasbinService } from './casbin.service';
import { Provider } from '@nestjs/common';
import { CASBIN_ENFORCER } from './nest-casbin.constants';
import { newEnforcer } from 'casbin';
import * as path from 'path';
import { MongoAdapter } from 'casbin-mongodb-adapter';

describe('CasbinService', () => {
  let service: CasbinService;

  const casbinEnforcerProvider: Provider = {
    provide: CASBIN_ENFORCER,
    useFactory: async () => {
      const model = path.resolve(__dirname, '../test-files/rbac_model.conf');
      const adapter = await MongoAdapter.newAdapter({
        uri: 'mongodb://localhost:27017',
        collection: 'casbin',
        database: 'casbindb',
      });
      const e = await newEnforcer(model, adapter);
      await e.loadPolicy();
      return e;
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [casbinEnforcerProvider, CasbinService],
      exports: [CasbinService],
    }).compile();

    service = module.get<CasbinService>(CasbinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
