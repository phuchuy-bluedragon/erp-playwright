import { LoginPage } from '../../pages/LoginPage';
import { test, expect } from '@playwright/test';
import { ClientPage } from '../../pages/ClientRegistrationPage';
import { clientTestData } from '../../types/client_items/client';

test.describe('ERP - Add Client', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        await loginPage.clickMainSection();
    });

    // Sử dụng entries() để lấy chỉ số i (0, 1, 2...)
    for (const [i, data] of clientTestData.entries()) {

        // Đảm bảo tiêu đề test là DUY NHẤT bằng cách thêm index i
        test(`Case ${i + 1}: Create client item - ${data.clientType}`, async ({ page }) => {
            const clientPage = new ClientPage(page);

            await page.getByRole('link', { name: '고객사코드' }).click();

            await clientPage.registerBtn.click();

            // Truyền finalData (đã có name mới) vào form
            await clientPage.fillForm(data);

            if (i % 2 == 0) {
                await page.getByRole('checkbox', { name: "시장" }).click();
                await page.getByRole('checkbox', { name: "자사몰" }).click();
            } else {
                await page.locator('section').filter({ hasText: /^플랫폼$/ }).click();

                await page.getByRole('checkbox', { name: '플랫폼' }).click();
                await page.getByRole('checkbox', { name: '지그재그' }).click();
                await page.getByRole('checkbox', { name: '온더룩' }).click();
                await page.getByRole('checkbox', { name: '29CM' }).click();
                await page.getByRole('checkbox', { name: '기타(입력)' }).click();
                await page.getByRole('textbox', { name: '내용 입력' }).nth(2).fill('기타123');
            }

            await clientPage.submit();

            await expect(page.getByText('Client created successfully')).toBeVisible();
        });
    }
});