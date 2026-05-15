import dotenv from 'dotenv';
import { qa }      from './environments/qa.js';
import { staging } from './environments/staging.js';
import { prod }    from './environments/prod.js';

const ENV = (process.env.ENV || 'qa').toLowerCase();

// Load the matching .env.<environment> file (e.g. .env.qa, .env.staging)
dotenv.config({ path: `.env.${ENV}` });

const envMap = { qa, staging, prod };

if (!envMap[ENV]) {
  throw new Error(
    `Unknown ENV: "${ENV}". Valid values are: qa, staging, prod`
  );
}

export const envConfig = envMap[ENV];
