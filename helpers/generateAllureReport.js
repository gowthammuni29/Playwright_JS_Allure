import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const reportsRoot = 'allure-reports';
const latestDir = path.join(reportsRoot, 'latest');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const reportDir = path.join(reportsRoot, `run-${timestamp}`);

// 1️⃣ Ensure reports root exists
fs.mkdirSync(reportsRoot, { recursive: true });

// 2️⃣ Generate new report
execSync(
  `allure generate allure-results -o ${reportDir} --clean`,
  { stdio: 'inherit' }
);

// 3️⃣ Remove old "latest"
if (fs.existsSync(latestDir)) {
  fs.rmSync(latestDir, { recursive: true, force: true });
}

// 4️⃣ Copy new report to "latest" (Windows-safe)
fs.cpSync(reportDir, latestDir, { recursive: true });

// 5️⃣ Auto-open latest report
console.log('Opening latest Allure report...');
execSync(`allure open ${latestDir}`, { stdio: 'inherit' });