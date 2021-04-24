import * as Joi from 'joi';

export const configSchema = Joi.object({
  APP_NAME: Joi.string().required(),
  APP_DOMAIN: Joi.string(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'testing')
    .default('development'),
  APP_PORT: Joi.number().required(),
  APP_SECURE_PORT: Joi.number(),
  API_MONGODB_HOST: Joi.string().default('localhost'),
  API_MONGODB_PORT: Joi.number(),
  API_MONGODB_USER: Joi.string(),
  API_MONGODB_PASSWORD: Joi.string(),
  API_MONGODB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().default('secret'),
  JWT_EXPIRES: Joi.string().default('365d'),
  JWT_SALTS: Joi.number().default(10),
  API_S3_BUCKET: Joi.string().required(),
  API_S3_ENDPOINT: Joi.string().uri(),
  API_S3_ACCESS_KEY: Joi.string(),
  API_S3_ACCESS_SECRET_KEY: Joi.string(),
  SNS_ACCESS_KEY: Joi.string(),
  SNS_ACCESS_SECRET_KEY: Joi.string(),
  SES_REGION: Joi.string(),
  SES_ACCESS_KEY: Joi.string(),
  SES_ACCESS_SECRET_KEY: Joi.string(),
  AWS_ACCESS_KEY: Joi.string(),
  AWS_ACCESS_SECRET_KEY: Joi.string(),
});
