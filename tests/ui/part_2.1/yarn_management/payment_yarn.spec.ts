/// <reference types="node" />
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { PaymentPage } from '../../../../pages/part_2.1/YarnManagement/PaymentPage';
import { paymentYarnTestData } from '../../../../types/part_2.1/yarn_management/payment_yarn';

test.describe('Yarn Management - Payment Registration Process', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        await loginPage.clickMainSection();
    });

    for (const [i, data] of paymentYarnTestData.entries()) {
        test(`Case ${i + 1}: Register payment for ${data.companyName} - Amount: ${data.amount}`, async ({ page }) => {
            const paymentPage = new PaymentPage(page);

            // 1. Điều hướng đến trang quản lý sợi
            await page.goto('https://dev.fabric365.co.kr/admin/yarn-management');
            await page.waitForLoadState('networkidle');

            // 2. Mở Dialog thanh toán
            await page.getByRole('button', { name: '결제 등록' }).click();

            // 3. Tìm kiếm và lấy giá trị ban đầu từ Grid
            if (data.companyName) {
                await paymentPage.companySearchInput.fill(data.companyName);
                
                // LẤY GIÁ TRỊ TỰ ĐỘNG TỪ UI
                const initial = await paymentPage.getCompanyValuesFromGrid(data.companyName);
                
                // Tính toán Expected theo công thức
                const amount = data.amount || 0;
                let expectedSupply: number;
                let expectedVat: number;

                // Tự động quyết định công thức dựa trên giá trị VAT ban đầu từ Grid
                if (initial.vat !== 0) {
                    // Có VAT: Hệ thống tính toán và ngắt phần thập phân (Math.floor)
                    expectedSupply = Math.floor(initial.supplyValue - (amount * 0.9));
                    expectedVat = Math.floor(initial.vat - (amount * 0.1));
                } else {
                    // Không VAT: Ngắt phần thập phân của hiệu số
                    expectedSupply = Math.floor(initial.supplyValue - amount);
                    expectedVat = 0;
                }
                // Tổng sau thanh toán là tổng của 2 giá trị đã làm tròn
                const expectedTotal = Math.floor(expectedSupply + expectedVat);

                // Chọn công ty
                await paymentPage.selectCompanyFromGrid(data.companyName);

                // 4. Điền thông tin thanh toán
                await paymentPage.fillPaymentInfo(data);

                // 4.1 Kiểm tra các giá trị tự động tính toán trên UI
                // Điều chỉnh format: Không lấy số thập phân (maximumFractionDigits: 0)
                const format = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });
                
                await expect(paymentPage.afterSupplyValueInput).toHaveValue(format(expectedSupply));
                await expect(paymentPage.afterVatInput).toHaveValue(format(expectedVat));
                await expect(paymentPage.afterTotalInput).toHaveValue(format(expectedTotal));
            }

            // 5. Lưu và kiểm tra kết quả
            await paymentPage.clickSave();
            await expect(paymentPage.dialog).toBeHidden();
            await expect(page.getByText('저장되었습니다')).toBeVisible();
        });
    }
});