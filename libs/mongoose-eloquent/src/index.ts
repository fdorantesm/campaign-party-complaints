/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Document as MongooseDocument,
  EloquentModel,
  PaginateOptions,
  PaginateResult,
  Schema,
} from 'mongoose';

// TODO: Isolate
import { QueryParserOptionsInterface } from '../../../src/modules/core/interfaces/query-parser.interface';

export function mongooseEloquent(schema: Schema): void {
  schema.static(
    'getOne',
    function (filter: any, options?: QueryParserOptionsInterface) {
      const query = this.findOne(filter);
      return _options(query, options);
    },
  );

  schema.static(
    'getAll',
    function (filter: any, options?: QueryParserOptionsInterface) {
      const query = this.find(filter);
      return _options(query, options);
    },
  );

  schema.static(
    'getPaginate',
    function (filter: any, options?: QueryParserOptionsInterface) {
      const that = this as EloquentModel<MongooseDocument<any>>;
      return that.paginate(filter, options);
    },
  );
}

function _options(query, options) {
  if (options) {
    query.populate(options.populate);
    query.setOptions({
      limit: options.limit,
      lean: options.lean,
      projection: options.select,
    });
  }
  return query.exec();
}
