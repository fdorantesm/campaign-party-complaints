export type MongodbQueryResultType = { ok?: number; n?: number } & {
  deletedCount?: number;
};
