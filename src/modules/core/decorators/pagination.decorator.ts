// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { PaginationInterface } from '../../common/interfaces/pagination.interface';

// export const Pagination = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const pagination: PaginationInterface = {
//       select: request.query.select,
//       page: Number(request.query.page || 1),
//       lean: request.query.lean,
//       limit: Number(request.query.limit || 30),
//       populate: request.query.populate ? request.query.populate.split(',') : [],
//       sort: request.query.sort
//     };
//     return pagination;
//   }
// );
