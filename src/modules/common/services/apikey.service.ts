import { Injectable } from '@nestjs/common';
import * as uuidAPIKey from 'uuid-apikey';

import { ApiKeyPairType } from '../types/apikey-pair.type';

@Injectable()
export class ApiKeyService {
  public generate(): ApiKeyPairType {
    return uuidAPIKey.default.create();
  }

  public uuidToApiKey(uuid: string): string {
    return uuidAPIKey.default.toAPIKey(uuid);
  }

  public apiKeyToUUID(apiKey: string): string {
    return uuidAPIKey.default.toUUID(apiKey);
  }

  public isAPIKey(apikey: string): boolean {
    return uuidAPIKey.default.isAPIKey(apikey);
  }

  public check(apiKey: string, uuid: string): boolean {
    return uuidAPIKey.default.check(apiKey, uuid);
  }
}
