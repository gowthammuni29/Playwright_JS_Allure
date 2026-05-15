import { defineConfig } from '@playwright/test';
import { envConfig } from './config/env.config.js';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? envConfig.retries : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: envConfig.timeout,
  globalSetup: './global-setup.js',

  reporter: [
    ['list'],
    ['allure-playwright'],
  ],

  use: {
    baseURL: envConfig.baseURL,
    headless: envConfig.headless,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'login-tests',
      testMatch: /login\/.*\.spec\.js/,
    },
    {
      name: 'authenticated-tests',
      testIgnore: /login\/.*\.spec\.js/,
      use: { storageState: 'auth.json' },
    },
  ],
});
