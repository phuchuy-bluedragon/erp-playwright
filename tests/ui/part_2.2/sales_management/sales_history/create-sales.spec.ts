import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { CreateSalesPage } from '../../../../../pages/part_2.2/SalesManagement/CreateSalesPage';
import { salesTestData } from '../../../../../types/part_2.2/sales_management/sales_history_item';

test.describe('Sales Management - Create Sales Item', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        await loginPage.clickMainSection();
    });

    for (const [i, data] of salesTestData.entries()) {
        test(`Case ${i + 1}: Create sales item - ${data.unitType} - ${data.styleNo}`, async ({ page }) => {
            const createPage = new CreateSalesPage(page);

            // 1. Điều hướng và mở dialog
            await page.goto('https://dev.fabric365.co.kr/admin/sale-management/sale-history');
            await page.waitForLoadState('networkidle');

            // Đảm bảo trang đã load xong nút trước khi click
            const registerBtn = page.getByRole('button', { name: '판매 직접 등록' });
            await registerBtn.waitFor({ state: 'visible' });
            await registerBtn.click();

            // 2. Điền thông tin từ file data
            await createPage.enterItemDetails(data);

            // 3. Lưu và kiểm tra
            await createPage.clickSave();
            
            // Kiểm tra Dialog đã đóng và hiển thị thông báo thành công
            await expect(createPage.dialog).toBeHidden();
            await expect(page.getByText(/created successfully|성공/i)).toBeVisible();
        });
    }
});