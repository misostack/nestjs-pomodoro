import * as dotenv from 'dotenv';

export const NODE_ENV = process.env.NODE_ENV;
// LOAD process's enviroment variables
dotenv.config({
  path:
    NODE_ENV !== 'test'
      ? `${process.cwd()}/.env`
      : `${process.cwd()}/.env.test`,
});
// REQUIRED VARIABLES
const REQUIRED_VARIABLES = ['NODE_ENV', 'DB_TYPE', 'DB_URI'];
/*
Log level:
- fatal
- error
- warn
- info
- verbose
- debug
*/
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const ERROR_LOG_PATH =
  process.env.ERROR_LOG_PATH || 'logs/server-errors.log';
export const LOG_PATH = process.env.LOG_PATH || 'logs/server.log';

export const validateRequiredEnviromentVariables = () => {
  const missingKeys = [];
  REQUIRED_VARIABLES.map((requiredKey) => {
    if (!process.env[requiredKey]) {
      missingKeys.push(requiredKey);
    }
  });
  if (missingKeys.length > 0) {
    console.log(missingKeys);
    missingKeys.map((key, index) => {
      console.error(`${index + 1}. Missing ${key} !!!`);
    });
    process.exit(1);
  }
};
export enum ALLOWED_DB_TYPES {
  mysql = 'mysql',
}

export const DB_TYPE: ALLOWED_DB_TYPES = ALLOWED_DB_TYPES[process.env.DB_TYPE];
export const DB_URI = process.env.DB_URI;
export const DB_LOGGING = process.env.DB_LOGGING || false ? true : false;

validateRequiredEnviromentVariables();
