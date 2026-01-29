import { LoginPage } from './../../pages/LoginPage';
import { test, expect } from '@playwright/test';
import { StaffPage } from './../../pages/StaffRegistrationPage';
import { staffTestData } from '../../types/staff_items/staff';

test.describe('ERP - Add Staff', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        await loginPage.clickMainSection();
    });

    // Sử dụng entries() để lấy chỉ số i (0, 1, 2...)
    for (const [i, data] of staffTestData.entries()) {

        // Đảm bảo tiêu đề test là DUY NHẤT bằng cách thêm index i
        test(`Case ${i + 1}: Create staff item - ${data.employmentStatus}`, async ({ page }) => {
            const staffPage = new StaffPage(page);

            await page.getByRole('link', { name: '직원코드' }).click();

            await staffPage.registerBtn.click();

            // Truyền finalData (đã có name mới) vào form
            await staffPage.fillForm(data);

            await staffPage.submit();

            await expect(page.getByText('저장되었습니다')).toBeVisible();
        });
    }
});