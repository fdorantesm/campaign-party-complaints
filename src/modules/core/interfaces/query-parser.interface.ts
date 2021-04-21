import { JsonType } from '../../../modules/common/types/json.type';

export interface QueryParserInterface {
  filter: JsonType;
  options: QueryParserOptionsInterface;
}

interface PopulatePath {
  path: string;
  populate: string | PopulatePath;
}

export interface QueryParserOptionsInterface {
  select?: JsonType;
  populate?: PopulatePath[];
  limit?: number;
  page?: number;
  sort?: JsonType;
  lean?: boolean;
}
