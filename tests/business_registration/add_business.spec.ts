import { LoginPage } from '../../pages/LoginPage';
import { test, expect } from '@playwright/test';
import { BusinessPage } from '../../pages/BusinessRegistrationPage';
import { businessTestData } from '../../types/business_items/business';

test.describe('Fabric ERP - Add Business', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('admin@erp.com', 'Admin@2025');
        await loginPage.clickMainSection();
    });

    // Sử dụng entries() để lấy chỉ số i (0, 1, 2...)
    for (const [i, data] of businessTestData.entries()) {

        // Đảm bảo tiêu đề test là DUY NHẤT bằng cách thêm index i
        test(`Case ${i + 1}: Create fabric item - ${data.businessPart}`, async ({ page }) => {
            const businessPage = new BusinessPage(page);

            await page.getByRole('link', { name: '업체코드' }).click();

            await businessPage.registerBtn.click();

            // Truyền finalData (đã có name mới) vào form
            await businessPage.fillForm(data);

            await businessPage.submit();

            await expect(page.getByText('Successfully created!')).toBeVisible();
        });
    }
});