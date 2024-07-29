import { test } from '@playwright/test';
import comparePdf from 'compare-pdf';
import { checkStatus } from '../utils/comparePdf.util';
import { comparePdfConfig, folderPath } from '../comparePdf.config';
import { ACTUAL_PDF, EXPECTER_PDF } from '../constants/constants';

const dateMask: comparePdf.PageMask = {
    pageIndex: 0,
    coordinates: { x0: 380, y0: 60, x1: 480, y1: 80 },
};

test.describe('compare-pdf', { tag: '@compare-pdf' }, async () => {
    test('should compare identical PDFs', async ({}, testInfo) => {
        const comparisonResults = await new comparePdf(comparePdfConfig)
            .actualPdfFile(EXPECTER_PDF)
            .baselinePdfFile(EXPECTER_PDF)
            .addMasks([dateMask])
            .compare();

        await checkStatus({
            status: comparisonResults.status,
            folderPath,
            expectedPdfFileName: EXPECTER_PDF,
            actualPdfFileName: EXPECTER_PDF,
            testInfo,
        });
    });

    test('should compare different PDFs', async ({}, testInfo) => {
        const comparisonResults = await new comparePdf(comparePdfConfig)
            .actualPdfFile(ACTUAL_PDF)
            .baselinePdfFile(EXPECTER_PDF)
            .addMasks([dateMask])
            .compare();

        await checkStatus({
            status: comparisonResults.status,
            folderPath,
            expectedPdfFileName: EXPECTER_PDF,
            actualPdfFileName: ACTUAL_PDF,
            testInfo,
        });
    });
});
