import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { FabricPage } from '../../pages/FabricRegistrationPage';
import { fabricTestData } from '../../types/fabric_items/fabric';

test.describe('Fabric ERP - Add Fabric (품목)', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin@erp.com', 'Admin@2025');
    await loginPage.clickMainSection();
  });

  // Sử dụng entries() để lấy chỉ số i (0, 1, 2...)
  for (const [i, data] of fabricTestData.entries()) {

    // Đảm bảo tiêu đề test là DUY NHẤT bằng cách thêm index i
    test(`Case ${i + 1}: Create fabric item - ${data.prodStandard}`, async ({ page }) => {
      const fabricPage = new FabricPage(page);

      await page.getByRole('link', { name: '원단 코드' }).first().click();

      await fabricPage.registerBtn2.click();

      if (i % 2 == 0) {
        await page.locator('div').filter({ hasText: /^몸판$/ }).first().click();
      } else {
        await page.locator('div').filter({ hasText: /^스와치$/ }).first().click();
      }

      // Truyền finalData (đã có name mới) vào form
      await fabricPage.fillForm1(data);

      await fabricPage.submit();
    });
  }
});