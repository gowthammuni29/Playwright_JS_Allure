import fs from 'fs';

export function cleanAllureResults() {
  if (fs.existsSync('allure-results')) {
    fs.rmSync('allure-results', { recursive: true, force: true });
  }
}