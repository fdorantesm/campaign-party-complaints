import { JsonType } from '../types/json.type';

export interface PaginationInterface {
  select?: JsonType | string;
  sort?: JsonType | string;
  populate?: JsonType | string[] | string;
  lean?: boolean;
  page: number;
  limit?: number;
}
