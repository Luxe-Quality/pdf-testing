import comparePdf from 'compare-pdf';
import { DATA_FOLDER } from './playwright.config';
import path from 'path';

export const folderPath = path.join('reports', 'compare-pdf');

export const comparePdfConfig: comparePdf.ComparePdfConfig = {
    paths: {
        actualPdfRootFolder: DATA_FOLDER, // path to the folder with actual PDFs (which will be generated during testing)
        baselinePdfRootFolder: DATA_FOLDER, // path to the folder with the base PDFs (the ones that will be compared)
        actualPngRootFolder: path.join(folderPath, 'actualPngs'), // path for screenshots of actual PDFs
        baselinePngRootFolder: path.join(folderPath, 'baselinePngs'), // path for screenshots of base PDFs
        diffPngRootFolder: path.join(folderPath, 'diffPngs'), // path for screenshots of difference
    },
    settings: {
        imageEngine: 'nature',
        density: 100,
        quality: 70,
        tolerance: 0,
        threshold: 0.05,
        cleanPngPaths: false,
        matchPageCount: true,
        disableFontFace: true,
        verbosity: 0,
    },
};
