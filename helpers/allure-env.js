import fs from 'fs';

export function writeAllureEnv() {
  const resultsDir = 'allure-results';

  // ✅ Ensure directory exists
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const content = `
ENV=QA
BASE_URL=https://demoblaze.com
BROWSER=Chromium
EXECUTED_BY=Gowtham M
  `.trim();

  fs.writeFileSync(
    `${resultsDir}/environment.properties`,
    content
  );
}