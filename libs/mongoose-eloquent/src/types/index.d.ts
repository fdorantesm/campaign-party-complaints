// TODO: Isolate dependencies
import { QueryParserOptionsInterface } from '../../../../src/modules/core/interfaces/query-parser.interface';

declare module 'mongoose' {
  interface EloquentModel<T extends Document> extends Model<T> {
    getOne(
      filter?: { [key: string]: any },
      options?: QueryParserOptionsInterface,
    ): Promise<T>;

    getPaginate(
      filter?: { [key: string]: any },
      options?: QueryParserOptionsInterface,
    ): Promise<PaginateResult<T>>;

    getAll(
      filter?: { [key: string]: any },
      options?: QueryParserOptionsInterface,
    ): Promise<T[]>;

    paginate(
      filter?: { [key: string]: any },
      options?: QueryParserOptionsInterface,
    ): Promise<PaginateResult<T>>;
  }
}
