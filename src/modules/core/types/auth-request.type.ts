import { Request } from 'express';
import { TokenPayloadType } from 'src/modules/auth/types/token-payload.type';
export type AuthRequestType = Request & {
  user: TokenPayloadType;
  [key: string]: any;
};
