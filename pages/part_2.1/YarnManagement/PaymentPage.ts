import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface PaymentData {
    category?: string;
    paymentDate?: string;
    amount?: number;
    remarks?: string;
}

export class PaymentPage extends BasePage {
    readonly dialog: Locator;
    readonly companySearchInput: Locator;
    readonly categoryBtn: Locator;
    readonly paymentDateInput: Locator;
    readonly paymentAmountInput: Locator;
    readonly remarksInput: Locator;
    readonly afterSupplyValueInput: Locator; // 결제 후 미지급 공급가액
    readonly afterVatInput: Locator;         // 결제 후 미지급 부가세
    readonly afterTotalInput: Locator;       // 결제 후 미지급 합계
    readonly saveBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.dialog = page.getByRole('dialog');

        // Section bên trái: Tìm kiếm 업체 (Công ty)
        this.companySearchInput = this.dialog.getByPlaceholder('원사명 검색');

        // Section bên phải: Thông tin 결제 (Thanh toán)
        // Dùng filter theo text của Label để tìm đúng combobox/input
        this.categoryBtn = this.dialog.getByRole('combobox', { name: '구분' });
        this.paymentDateInput = this.dialog.getByRole('textbox', { name: '날짜 선택' });
        this.paymentAmountInput = this.dialog.locator('div').filter({ hasText: /^결제금액$/ }).getByPlaceholder('0');
        
        this.afterSupplyValueInput = this.dialog.locator('div').filter({ hasText: /^결제 후 미지급 공급가액$/ }).getByRole('textbox');
        this.afterVatInput = this.dialog.locator('div').filter({ hasText: /^결제 후 미지급 부가세$/ }).getByRole('textbox');
        this.afterTotalInput = this.dialog.locator('div').filter({ hasText: /^결제 후 미지급 합계$/ }).getByRole('textbox');
        
        // HTML cung cấp name="returnRemarks" cho trường 비고
        this.remarksInput = this.dialog.locator('input[name="returnRemarks"]');
        
        this.saveBtn = this.dialog.getByRole('button', { name: '확인' });
    }

    /**
     * Lấy các giá trị (공급가액, 부가세, 합계) của một công ty cụ thể từ Grid
     */
    async getCompanyValuesFromGrid(companyName: string) {
        const row = this.dialog.locator('div.grid-cols-12.cursor-pointer').filter({ hasText: companyName });
        await row.waitFor({ state: 'visible' });

        // Locator cho 3 cột giá trị bên phải (공급가액, 부가세, 합계)
        const valueCells = row.locator('div.col-span-6.grid-cols-3 > div');
        
        const rawSupply = await valueCells.nth(0).innerText();
        const rawVat = await valueCells.nth(1).innerText();
        const rawTotal = await valueCells.nth(2).innerText();

        // Hàm helper để chuyển chuỗi "123,456.7" thành số 123456.7
        const parseMoney = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;

        return {
            supplyValue: parseMoney(rawSupply),
            vat: parseMoney(rawVat),
            total: parseMoney(rawTotal)
        };
    }

    /**
     * Chọn công ty từ danh sách (Grid) dựa trên tên
     */
    async selectCompanyFromGrid(companyName: string) {
        const row = this.dialog.locator('div.grid-cols-12.cursor-pointer').filter({ hasText: companyName });
        await row.waitFor({ state: 'visible' });
        await row.click();
    }

    /**
     * Điền thông tin thanh toán
     */
    async fillPaymentInfo(data: PaymentData) {
        if (data.category) {
            await this.categoryBtn.click();
            await this.page.getByRole('option', { name: data.category }).click();
        }

        if (data.paymentDate) {
            await this.paymentDateInput.fill(data.paymentDate);
            await this.paymentDateInput.press('Enter');
        }

        if (data.amount) {
            await this.paymentAmountInput.fill(data.amount.toString());
        }

        if (data.remarks) {
            await this.remarksInput.fill(data.remarks);
        }
    }

    /**
     * Nhấn xác nhận lưu
     */
    async clickSave() {
        await expect(this.saveBtn).toBeEnabled();
        await this.saveBtn.click();
    }
}