import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  const status = await comparePdfToSnapshot(
    path.join(COMPARE_PDF_DATA_FOLDER, formPdfFileName),
    COMPARE_PDF_DATA_FOLDER,
    eevStandardI9,
    {
      maskRegions: (page) => {
        switch (page) {
          case 1:
            return [
              headerDateMask,
              signDateEmployeeMasks,
              signDateReviewerMasks,
            ];
          case 2:
            return [headerDateMask];
          case 3:
            return [
              headerDateMask,
              signDatePreparerMasks1,
              signDatePreparerMasks2,
            ];
          case 4:
            return [headerDateMask];
          default:
            return [];
        }
      },
    }
  );

  await checkStatus(status, eevStandardI9, testInfo);
});
