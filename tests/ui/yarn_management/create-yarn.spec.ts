import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { CreateYarnPage } from '../../../pages/YarnManagement/CreateYarnPage';

test.describe('Yarn Management - Create Yarn Invoice', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        await loginPage.clickMainSection();
    });

    test('Create new yarn invoice successfully', async ({ page }) => {
        const createPage = new CreateYarnPage(page);

        // 1. Điều hướng đến trang quản lý và mở Dialog
        // Lưu ý: Cập nhật URL chính xác hoặc click menu tương ứng tại đây
        await page.goto('https://dev.fabric365.co.kr/admin/yarn-management');

        // Giả định có nút để mở dialog này, ví dụ: "원사 송장 등록"
        await page.getByRole('button', { name: '송장 등록' }).click();

        // 2. Điền dữ liệu test
        await createPage.enterItemDetails({
            date: '2026-03-22',
            yarnName: '20260130 _ 105618_1',        // Tên nguyên liệu có trong danh sách HTML bạn cung cấp
            receiverCategory: '원사업체', // Option ví dụ
            receiverCompany: '20260212 _ 180423_1',   // Option ví dụ
            quantity: 100,
            quantityUnit: 'KG',
            price: 5000,
            priceUnit: '원',
            vat: '반영',
            remarks: 'Auto Test Playwright'
        });

        // 3. Lưu
        await createPage.clickSave();

        // 4. Kiểm tra kết quả
        // Kiểm tra Dialog đã đóng
        await expect(createPage.dialog).toBeHidden();

        // Kiểm tra thông báo thành công (Toast message)
        await expect(page.getByText('성공적으로 등록되었습니다')).toBeVisible(); // Hoặc text tương ứng
    });
});
