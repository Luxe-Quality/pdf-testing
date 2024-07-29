import fs from 'fs';
import path from 'path';

import { expect, type TestInfo } from '@playwright/test';

async function attachSnapshots(
    name: string,
    folderPath: string,
    testInfo: TestInfo,
) {
    const files = fs.readdirSync(folderPath);
    for (let i = 0; i < files.length; i++)
        await testInfo.attach(`${name} page ${i + 1}`, {
            body: fs.readFileSync(path.join(folderPath, files[i])),
            contentType: 'image/png',
        });
}

/**
 * Checks PDF comparison status and adds results to Playwright HTML report.
 */
export async function checkStatus(data: {
    status: string;
    folderPath: string;
    expectedPdfFileName: string;
    actualPdfFileName: string;
    testInfo: TestInfo;
}): Promise<void> {
    data.actualPdfFileName = data.actualPdfFileName.replace('.pdf', '');
    data.expectedPdfFileName = data.expectedPdfFileName.replace('.pdf', '');

    const actualPngsPath = path.join(
        data.folderPath,
        'actualPngs',
        data.actualPdfFileName,
    );
    const expectedPngsPath = path.join(
        data.folderPath,
        'baselinePngs',
        data.expectedPdfFileName,
    );
    const diffPngsPath = path.join(
        data.folderPath,
        'diffPngs',
        data.actualPdfFileName,
    );
    try {
        expect(
            data.status,
            'Check if PDF comparison status is "passed" (PDF files are identical)',
        ).toEqual('passed');
        attachSnapshots(
            'Expected PDF snapshot',
            expectedPngsPath,
            data.testInfo,
        );
    } catch (error) {
        attachSnapshots(
            'Expected PDF snapshot',
            expectedPngsPath,
            data.testInfo,
        );
        attachSnapshots('Actual PDF snapshot', actualPngsPath, data.testInfo);
        attachSnapshots('Diff PDF snapshot', diffPngsPath, data.testInfo);
        throw error;
    }
}
