import { expect, test } from '@playwright/test';
import { ACTUAL_PDF, EXPECTER_PDF } from '../constants/constants';
import fs from 'fs';
import path from 'path';
import { DATA_FOLDER } from '../playwright.config';
import pdf from 'pdf-parse';

const basePdfText = (date: string) => `

${date} 
PDF testing `;

test.describe('pdf-parse', { tag: '@pdf-parse' }, async () => {
    test('should compare identical PDFs', async ({}) => {
        const pdfData = await pdf(
            fs.readFileSync(path.join(DATA_FOLDER, EXPECTER_PDF)),
        );

        expect(pdfData.numpages).toEqual(1);
        expect(pdfData.text).toEqual(basePdfText('01.01.2000'));
    });

    test('should compare different PDFs', async ({}) => {
        const pdfData = await pdf(
            fs.readFileSync(path.join(DATA_FOLDER, ACTUAL_PDF)),
        );

        expect(pdfData.numpages).toEqual(1);
        expect(pdfData.text).toEqual(basePdfText('01.01.2024'));
    });
});
