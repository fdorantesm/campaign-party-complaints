import { Module } from '@nestjs/common';

import { HashService } from './services/hash.service';
import { ApiKeyService } from './services/apikey.service';
import { UuidService } from './uuid-generator/uuid.service';
import { MimeTypesService } from './mime-types/mime-types.service';

@Module({
  providers: [HashService, ApiKeyService, UuidService, MimeTypesService],
  exports: [HashService, ApiKeyService, UuidService, MimeTypesService],
})
export class CommonModule {}
