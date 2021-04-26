import { SetMetadata } from '@nestjs/common';

export const Scope = (...fields: string[]) => SetMetadata('fields', fields);
