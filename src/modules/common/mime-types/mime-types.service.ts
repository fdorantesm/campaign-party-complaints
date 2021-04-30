import { Injectable } from '@nestjs/common';
import * as mimeTypes from 'mime-types';

@Injectable()
export class MimeTypesService {
  public extension(mime: string): string {
    return mimeTypes.extension(mime);
  }

  public lookup(extension: string): string {
    return mimeTypes.lookup(extension);
  }
}
