import { Test, TestingModule } from '@nestjs/testing';
import { AccountSeed } from './account.seed';

describe('AccountSeed', () => {
  let provider: AccountSeed;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountSeed],
    }).compile();

    provider = module.get<AccountSeed>(AccountSeed);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
