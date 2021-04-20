export type MongodbConfigType = {
  server: string;
  port: number;
  user?: string;
  password?: string;
  database?: string;
  getUriString?: (...params: any[]) => string;
};
