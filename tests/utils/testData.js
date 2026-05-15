import { envConfig } from '../../config/env.config.js';

export const testData = {
  validUser: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  invalidUser: {
    username: 'invalid_user',
    password: 'wrong_pass',
  },
  baseURL: envConfig.baseURL,
};
