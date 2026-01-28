import { LoginPage } from './../../pages/LoginPage';
import { test, expect } from '@playwright/test';
import { YarnPage } from './../../pages/YarnRegistrationPage';
import { yarnTestData } from '../../types/yarn_items/yarn';

test.describe('Fabric ERP - Add Yarn', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('admin@erp.com', 'Admin@2025');
        await loginPage.clickMainSection();
    });

    // Sử dụng entries() để lấy chỉ số i (0, 1, 2...)
    for (const [i, data] of yarnTestData.entries()) {

        // Đảm bảo tiêu đề test là DUY NHẤT bằng cách thêm index i
        test(`Case ${i + 1}: Create fabric item - ${data.yarnPart}`, async ({ page }) => {
            const yarnPage = new YarnPage(page);

            await page.getByRole('link', { name: '원사 코드' }).click();

            await yarnPage.registerBtn.click();

            // Truyền finalData (đã có name mới) vào form
            await yarnPage.fillForm(data);

            await yarnPage.submit();

            await expect(page.getByText('Successfully created!')).toBeVisible();
        });
    }
});