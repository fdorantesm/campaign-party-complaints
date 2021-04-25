import { createParamDecorator, ExecutionContext, Body } from '@nestjs/common';
import { flatten, unflatten } from 'flat';

import { JsonType } from '../../common/types/json.type';
import { Types } from 'mongoose';

export const BodyParser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const flat = flatten(request.body)
    Object.keys(flat).map(node => {
        try {
            if(flat[node].match(/^[0-9a-fA-F]{24}$/)) {
                flat[node] = Types.ObjectId(flat[node]);
            }
        } catch {
            //
        }
    })

    const result = unflatten(flat)

    return result;
  },
);
