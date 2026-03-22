import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import salesMockData from '../../../../fixtures/mock/part_2.2/sales_management/sales_history.json';

test.describe('ERP - Add Raw Fabric (품목) with Mocking', () => {

    test.beforeEach(async ({ page }) => {
        // Regex này chỉ khớp với URL kết thúc bằng sale_history (có thể kèm theo tham số query)
        // Nó sẽ KHÔNG khớp với /sale_history/total/details


        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        await loginPage.clickMainSection();
    });

    test('Mock sale history API', async ({ page }) => {
        await page.route(/\/api\/sale_history(\?.*)?$/, async (route) => {
            const url = route.request().url();
            console.log('🎯 CHỈ MOCK BẢNG CHÍNH:', url);

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(salesMockData), // File JSON có "dataList" của bạn
                headers: {
                    'access-control-allow-origin': '*',
                    'access-control-allow-credentials': 'true',
                    'content-encoding': 'identity'
                }
            });
        });

        // 3. Đi tới trang và kiểm tra kết quả
        await page.goto('https://dev.fabric365.co.kr/admin/sale-management/sale-history');

        // Kiểm tra xem dữ liệu mock có hiển thị trên UI không
        await expect(page.getByText('Công ty Mock Test')).toBeVisible();
        await expect(page.getByText('Vải Cotton 100%')).toBeVisible();
    });
});