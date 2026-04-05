/// <reference types="node" />
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { ReturnRawFabricPage } from '../../../../pages/part_2.1/RawFabricManagement/ReturnRawFabricPage';
import { returnRawFabricTestData } from '../../../../types/part_2.1/raw_fabric_management/return_raw_fabric_item';

test.describe('Raw Fabric Management - Return Item', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        await loginPage.clickMainSection();
    });

    for (const [i, data] of returnRawFabricTestData.entries()) {
        test(`Case ${i + 1}: Return Raw Fabric Item - ${data.fabricNameSearch} (Qty: ${data.returnQuantity})`, async ({ page }) => {
            const returnRawFabricPage = new ReturnRawFabricPage(page);

            // 1. Điều hướng đến trang quản lý 품목(생지)
            await page.goto('https://dev.fabric365.co.kr/admin/raw-fabric-management/view-raw-fabric-info');
            await page.waitForLoadState('networkidle');

            // 2. Mở Dialog "품목(생지) 반품 등록"
            // Giả định có một nút với tên này để mở dialog
            await page.getByRole('button', { name: '반품 등록' }).click();

            // 3. Điền thông tin từ dữ liệu mẫu
            await returnRawFabricPage.enterItemDetails(data);

            // 4. Kiểm tra các giá trị tự động tính toán (반품 공급가액 và 반품 합계)
            if (data.expectedSupplyValue !== undefined) {
                await expect(returnRawFabricPage.returnSupplyValueInput).toHaveValue(data.expectedSupplyValue.toString());
            }
            if (data.expectedTotal !== undefined) {
                await expect(returnRawFabricPage.returnTotalInput).toHaveValue(data.expectedTotal.toString());
            }

            // 5. Lưu và kiểm tra kết quả
            await returnRawFabricPage.clickSave();

            // Kiểm tra Dialog đã đóng và hiển thị thông báo thành công
            await expect(returnRawFabricPage.dialog).toBeHidden();
            await expect(page.getByText(/Successfully created|성공/i)).toBeVisible();
        });
    }
});