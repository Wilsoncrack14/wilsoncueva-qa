import { defineConfig, devices } from '@playwright/test';
import fs from 'node:fs';

const isCI = Boolean(
  (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env
    ?.CI
);

const localChromiumExecutable =
  '/home/will10/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome';

const useLocalExecutable = !isCI && fs.existsSync(localChromiumExecutable);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4399',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: useLocalExecutable
      ? {
          executablePath: localChromiumExecutable,
        }
      : undefined,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm preview --port 4399',
    url: 'http://localhost:4399',
    reuseExistingServer: false,
    timeout: 60 * 1000,
  },
});
