import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Search = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    delete request.query.select;
    delete request.query.page;
    delete request.query.lean;
    delete request.query.limit;
    delete request.query.populate;
    delete request.query.sort;
    return request.query;
  }
);
