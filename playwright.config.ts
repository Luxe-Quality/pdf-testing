import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export const DATA_FOLDER = path.join(__dirname, 'data');

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: 5,
    reporter: [['html', { open: 'never', outputFolder: 'reports/html' }]],
    use: {
        // baseURL: 'http://127.0.0.1:3000',

        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
