import fs from 'fs';
import path from 'path';

import { expect, type TestInfo } from '@playwright/test';

async function attachSnapshot(
    name: string,
    filePath: string,
    testInfo: TestInfo,
) {
    await testInfo.attach(name, {
        body: fs.readFileSync(filePath),
        contentType: 'image/png',
    });
}

/**
 * Checks PDF comparison status and adds results to the Playwright HTML report.
 */
export async function checkStatus(data: {
    status: boolean;
    folderPath: string;
    fileName: string;
    testInfo: TestInfo;
}): Promise<void> {
    const pdfBasePngPath = path.join(
        data.folderPath,
        '__snapshots__',
        `${data.fileName}.png`,
    );
    const pdfNewPngPath = path.join(
        data.folderPath,
        '__snapshots__',
        `${data.fileName}.new.png`,
    );
    const pdfDiffPngPath = path.join(
        data.folderPath,
        '__snapshots__',
        `${data.fileName}.diff.png`,
    );

    try {
        expect(
            data.status,
            'Check if PDF comparison status is "true" (PDF files are identical)',
        ).toBeTruthy();
        await attachSnapshot(
            'Expected PDF snapshot',
            pdfBasePngPath,
            data.testInfo,
        );
    } catch (error) {
        await attachSnapshot(
            'Expected PDF snapshot',
            pdfBasePngPath,
            data.testInfo,
        );
        await attachSnapshot(
            'Actual PDF snapshot',
            pdfNewPngPath,
            data.testInfo,
        );
        await attachSnapshot(
            'Diff PDF snapshot',
            pdfDiffPngPath,
            data.testInfo,
        );
        throw error;
    }
}
