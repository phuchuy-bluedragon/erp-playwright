/// <reference types="node" />
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { ReturnYarnPage } from '../../../../pages/part_2.1/YarnManagement/ReturnYarnPage';
import { yarnReturnTestData } from '../../../../types/part_2.1/yarn_management/return_yarn_item';

test.describe('Yarn Management - Return Yarn Process', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        await loginPage.clickMainSection();
    });

    for (const [i, data] of yarnReturnTestData.entries()) {
        test(`Case ${i + 1}: Register yarn return - ${data.searchYarnName} - Qty: ${data.returnQuantity}`, async ({ page }) => {
            const returnPage = new ReturnYarnPage(page);

            // 1. Điều hướng đến trang quản lý sợi
            await page.goto('https://dev.fabric365.co.kr/admin/yarn-management');
            await page.waitForLoadState('networkidle');

            await page.getByRole('textbox', { name: '업체명 선택' }).fill('');
            await page.getByRole('textbox', { name: '검색어 입력' }).fill('20260404 _ 164048_1');
            await page.getByRole('button', { name: '검색' }).click();

            // 2. Mở Dialog trả hàng
            await page.getByRole('button', { name: '반품 등록' }).click();

            // 3. Điền thông tin chi tiết từ dữ liệu mẫu
            await returnPage.enterItemDetails(data);

            // 4. Lưu và kiểm tra kết quả
            await returnPage.clickSave();
            await expect(returnPage.dialog).toBeHidden();
            await expect(page.getByText('Successfully created')).toBeVisible();
        });
    }
});