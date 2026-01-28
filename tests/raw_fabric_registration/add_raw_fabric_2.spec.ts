import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RawFabricPage } from '../../pages/RawFabricRegistrationPage';
import { rawFabricTestData } from '../../types/raw_fabric_items/raw_fabric_2';

test.describe('Fabric ERP - Add Raw Fabric (완사입)', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin@erp.com', 'Admin@2025');
    await loginPage.clickMainSection();
  });

  // Sử dụng entries() để lấy chỉ số i (0, 1, 2...)
  for (const [i, data] of rawFabricTestData.entries()) {

    // Đảm bảo tiêu đề test là DUY NHẤT bằng cách thêm index i
    test(`Case ${i + 1}: Create fabric item - ${data.fabricPart}`, async ({ page }) => {
      const rawFabricPage = new RawFabricPage(page);

      await page.getByRole('link', { name: '품목(생지) 코드' }).click();

      await rawFabricPage.registerBtn2.click();

      // Truyền finalData (đã có name mới) vào form
      await rawFabricPage.fillForm2(data);

      await rawFabricPage.submit();

      await expect(page.getByText('Successfully created!')).toBeVisible();
    });
  }
});