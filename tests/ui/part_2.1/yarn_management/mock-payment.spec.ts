/// <reference types="node" />
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import remainingPaymentData from '../../../fixtures/mock/part_2.1/yarn_management/remaining_payment.json';

test.describe('Yarn Management - Payment Registration with Mock Data', () => {
    
    test.beforeEach(async ({ page }) => {
        // 1. Mock API trước khi bắt đầu test
        // URL này dựa trên curl command bạn đã cung cấp trước đó
        await page.route('**/api/payment/remaining', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                // Truyền object đã import vào body
                body: JSON.stringify(remainingPaymentData) 
            });
        });

        // 2. Đăng nhập
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        await loginPage.clickMainSection();
    });

    test('Should display and select mocked payment data', async ({ page }) => {
        // Điều hướng đến trang quản lý sợi
        await page.goto('https://dev.fabric365.co.kr/admin/yarn-management');
        await page.waitForLoadState('networkidle');

        await page.getByRole('textbox', { name: '업체명 선택' }).fill('');
        await page.getByRole('textbox', { name: '검색어 입력' }).fill('20260404 _ 164048_1');
        await page.getByRole('button', { name: '검색' }).click();

        // Mở popup 결제 등록 (Giả định nút này tên là '결제 등록')
        await page.getByRole('button', { name: '결제 등록' }).click();

        // Kiểm tra dữ liệu mock có hiển thị trong grid không
        await expect(page.getByText('VA yarn (Mocked)').nth(0)).toBeVisible();
        await expect(page.getByText('KFC Yarn (Mocked)').nth(0)).toBeVisible();
    });
});