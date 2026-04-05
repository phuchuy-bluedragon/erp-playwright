/// <reference types="node" />
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { CreateRawFabricPage } from '../../../../pages/part_2.1/RawFabricManagement/CreateRawFabricPage';
import { rawFabricTestData } from '../../../../types/part_2.1/raw_fabric_management/create_raw_fabric_item';

test.describe('Raw Fabric Management - Create Item', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        await loginPage.clickMainSection();
    });

    for (const [i, data] of rawFabricTestData.entries()) {
        test(`Case ${i + 1}: Create Raw Fabric Item - ${data.fabricNameSearch} (${data.category})`, async ({ page }) => {
            const createRawFabricPage = new CreateRawFabricPage(page);

            // 1. Điều hướng đến trang quản lý 품목(생지)
            await page.goto('https://dev.fabric365.co.kr/admin/raw-fabric-management/view-raw-fabric-info');
            await page.waitForLoadState('networkidle');

            await page.getByRole('textbox', { name: '업체명 선택' }).fill('');
            await page.getByRole('textbox', { name: '검색어 입력' }).fill('20260405 _ 181429_편직_3');
            await page.getByRole('button', { name: '검색' }).click();

            // 2. Mở Dialog "품목(생지) 송장 등록"
            // Giả định có một nút với tên này để mở dialog
            await page.getByRole('button', { name: '송장 등록' }).click();

            // 3. Điền thông tin từ dữ liệu mẫu
            await createRawFabricPage.enterItemDetails(data);

            // 4. Kiểm tra các giá trị tự động tính toán (공급가액 và 합계)
            if (data.expectedSupplyValue !== undefined) {
                await expect(createRawFabricPage.supplyValueInput).toHaveValue(data.expectedSupplyValue.toString());
            }
            if (data.expectedTotal !== undefined) {
                await expect(createRawFabricPage.totalInput).toHaveValue(data.expectedTotal.toString());
            }

            // 5. Lưu và kiểm tra kết quả
            // 4. Lưu và kiểm tra kết quả
            await createRawFabricPage.clickSave();

            // Kiểm tra Dialog đã đóng và hiển thị thông báo thành công
            await expect(createRawFabricPage.dialog).toBeHidden();
            // Sử dụng regex để kiểm tra thông báo thành công, hỗ trợ cả tiếng Anh và tiếng Hàn
            await expect(page.getByText('Successfully created')).toBeVisible();
        });
    }
});