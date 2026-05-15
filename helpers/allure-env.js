import fs from 'fs';
import { envConfig } from '../config/env.config.js';

export function writeAllureEnv() {
  const resultsDir = 'allure-results';

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const content = [
    `ENV=${envConfig.env}`,
    `BASE_URL=${envConfig.baseURL}`,
    `BROWSER=Chromium`,
    `EXECUTED_BY=${process.env.EXECUTED_BY || 'Local'}`,
  ].join('\n');

  fs.writeFileSync(`${resultsDir}/environment.properties`, content);
}
