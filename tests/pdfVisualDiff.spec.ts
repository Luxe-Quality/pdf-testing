import { test } from '@playwright/test';
import path from 'path';
import { comparePdfToSnapshot } from 'pdf-visual-diff';
import { DATA_FOLDER } from '../playwright.config';
import { checkStatus } from '../utils/pdfVisualDiff.util';
import { ACTUAL_PDF, EXPECTER_PDF } from '../constants/constants';
import { RegionMask } from 'pdf-visual-diff/lib/compare-pdf-to-snapshot';

const dateMask: RegionMask = {
    type: 'rectangle-mask',
    x: 550,
    y: 90,
    width: 135,
    height: 30,
    color: 'Black',
};

test.describe('pdf-visual-diff', { tag: '@pdf-visual-diff' }, async () => {
    test('should compare identical PDFs', async ({}, testInfo) => {
        const status = await comparePdfToSnapshot(
            path.join(DATA_FOLDER, EXPECTER_PDF),
            path.join(DATA_FOLDER, 'pdf-visual-diff'),
            'pdf-snapshot-passed',
            {
                maskRegions: (page) => {
                    switch (page) {
                        case 1:
                            return [dateMask];
                        default:
                            return [];
                    }
                },
            },
        );

        await checkStatus({
            status,
            folderPath: path.join(DATA_FOLDER, 'pdf-visual-diff'),
            fileName: 'pdf-snapshot-passed',
            testInfo,
        });
    });

    test('should compare different PDFs', async ({}, testInfo) => {
        const status = await comparePdfToSnapshot(
            path.join(DATA_FOLDER, ACTUAL_PDF),
            path.join(DATA_FOLDER, 'pdf-visual-diff'),
            'pdf-snapshot-failed',
            {
                maskRegions: (page) => {
                    switch (page) {
                        case 1:
                            return [dateMask];
                        default:
                            return [];
                    }
                },
            },
        );

        await checkStatus({
            status,
            folderPath: path.join(DATA_FOLDER, 'pdf-visual-diff'),
            fileName: 'pdf-snapshot-failed',
            testInfo,
        });
    });
});
