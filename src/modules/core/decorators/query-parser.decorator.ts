import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MongooseQueryParser } from 'mongoose-query-parser';

import { QueryParserInterface } from '../interfaces/query-parser.interface';
import * as deepPopulate from 'deep-populate';
import { JsonType } from '../../common/types/json.type';
import { Types } from 'mongoose';

export const QueryParser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const parser = new MongooseQueryParser();

    if (request.query.select) {
      request.query.select = request.query.select.split(',').join(' ');
    }

    const parsedQuery: JsonType = parser.parse(request.query);

    console.log({ parsedQuery });

    Object.keys(parsedQuery.filter).map((key) => {
      try {
        parsedQuery.filter[key] = Types.ObjectId(parsedQuery.filter[key]);
      } catch (err) {
        //
      }
    });

    delete parsedQuery.filter.select;
    delete parsedQuery.filter.page;
    delete parsedQuery.filter.lean;
    delete parsedQuery.filter.limit;
    delete parsedQuery.filter.populate;
    delete parsedQuery.filter.sort;

    parsedQuery.page = Number(parsedQuery.page || request.query.page || 1);
    parsedQuery.limit = Number(parsedQuery.limit || 30);

    parsedQuery.options = { ...parsedQuery };

    delete parsedQuery.select;
    delete parsedQuery.populate;
    delete parsedQuery.sort;
    delete parsedQuery.limit;
    delete parsedQuery.page;

    delete parsedQuery.options.filter;

    const payload = parsedQuery as QueryParserInterface;

    if (request.query.populate) {
      payload.options.populate = deepPopulate(request.query.populate);
    }

    const result = data ? payload && payload[data] : payload;

    return result;
  },
);
