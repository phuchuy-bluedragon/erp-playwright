/// <reference types="node" />
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { CreateYarnPage } from '../../../../pages/part_2.1/YarnManagement/CreateYarnPage';
import { yarnTestData } from '../../../../types/part_2.1/yarn_management/create_yarn_item';

test.describe('Yarn Management - Create Yarn Invoice', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        await loginPage.clickMainSection();
    });

    for (const [i, data] of yarnTestData.entries()) {
        test(`Case ${i + 1}: Create yarn invoice - ${data.yarnName} - ${data.quantity}${data.quantityUnit}`, async ({ page }) => {
            const createPage = new CreateYarnPage(page);

            // 1. Điều hướng đến trang quản lý
            await page.goto('https://dev.fabric365.co.kr/admin/yarn-management');
            await page.waitForLoadState('networkidle');

            await page.getByRole('textbox', { name: '업체명 선택' }).fill('');
            await page.getByRole('textbox', { name: '검색어 입력' }).fill('20260404 _ 164048_1');
            await page.getByRole('button', { name: '검색' }).click();

            // Mở dialog đăng ký
            await page.getByRole('button', { name: '송장 등록' }).click();

            // 2. Điền dữ liệu từ file yarn_tem.ts
            await createPage.enterItemDetails(data);

            // 3. Lưu
            await createPage.clickSave();

            // 4. Kiểm tra kết quả
            await expect(createPage.dialog).toBeHidden();
            await expect(page.getByText('Successfully created')).toBeVisible();
        });
    }
});
