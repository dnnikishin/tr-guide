import * as Joi from 'joi';
import { Logger } from '@nestjs/common';

interface EnvConfig {
  NODE_ENV: string;
  PORT: string;
  PATH_ENV: string;
  API_BASE_PATH: string;
  UPLOAD_STATIC_CONTENT: string;
  SWAGGER_VERSION: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;

  DB_USERNAME: string;
  DB_HOST: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_DATABASE: string;
}

export class ConfigProvider {
  readonly ENV: EnvConfig;

  constructor() {
    const config = {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      API_BASE_PATH: process.env.API_BASE_PATH,
      UPLOAD_STATIC_CONTENT: process.env.UPLOAD_STATIC_CONTENT,
      SWAGGER_VERSION: process.env.SWAGGER_VERSION,
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

      DB_USERNAME: process.env.DB_USERNAME,
      DB_HOST: process.env.DB_HOST,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_PORT: process.env.DB_PORT,
      DB_DATABASE: process.env.DB_DATABASE,

    };
    Logger.log(`NODE_ENV: ${config.NODE_ENV}`, ConfigProvider.name);
    this.ENV = this.validateInput(config);
  }

  private validateInput(envConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string().required()
        .valid(['development', 'staging', 'production'])
        .default('development'),
      PORT: Joi.number().default(8080),
      API_BASE_PATH: Joi.string().default(''),
      UPLOAD_STATIC_CONTENT: Joi.string().required(),
      SWAGGER_VERSION: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRES_IN: Joi.string().required(),

      DB_USERNAME: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_DATABASE: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      Logger.error(`Validation error: ${error.message}`, ConfigProvider.name);
    }
    return validatedEnvConfig;
  }
}
