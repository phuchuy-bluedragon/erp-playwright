import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface YarnReturnData {
    searchYarnName?: string;
    returnDate?: string;
    collectionCategory?: string;
    collectionCompany?: string;
    returnQuantity?: number;
    returnQuantityUnit?: string;
    returnUnitPrice?: number;
    returnUnitPriceUnit?: string;
    returnUnitWeight?: number;
    returnVat?: string;
    returnRemarks?: string;
}

export class ReturnYarnPage extends BasePage {
    readonly dialog: Locator;
    readonly yarnSearchInput: Locator;
    readonly returnDateInput: Locator;
    readonly collectionCategoryBtn: Locator;
    readonly collectionCompanyBtn: Locator;
    readonly returnQuantityInput: Locator;
    readonly returnQuantityUnitBtn: Locator;
    readonly returnUnitPriceInput: Locator;
    readonly returnUnitPriceUnitBtn: Locator;
    readonly returnUnitWeightInput: Locator;
    readonly vatBtn: Locator;
    readonly remarksInput: Locator;
    readonly saveBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.dialog = page.getByRole('dialog');
        
        // Section bên trái: Tìm kiếm
        this.yarnSearchInput = this.dialog.getByPlaceholder('원사명 검색');

        // Section bên phải: Thông tin trả hàng
        this.returnDateInput = this.dialog.getByPlaceholder('날짜 선택');

        // Định nghĩa các Combobox và Input dựa trên nhãn (Label) để đảm bảo độ bền
        const collectionContainer = this.dialog.locator('div').filter({ hasText: /^회수지/ });
        this.collectionCategoryBtn = collectionContainer.getByRole('combobox').first();
        this.collectionCompanyBtn = collectionContainer.getByRole('combobox').last();

        const qtyContainer = this.dialog.locator('div').filter({ hasText: /^반품 수량\/단위$/ });
        this.returnQuantityInput = qtyContainer.locator('input');
        this.returnQuantityUnitBtn = this.dialog.getByRole('combobox').filter({ hasText: /^선택$/ }).nth(0);

        const priceContainer = this.dialog.locator('div').filter({ hasText: /^반품 단가\/단위$/ });
        this.returnUnitPriceInput = priceContainer.locator('input');
        this.returnUnitPriceUnitBtn = this.dialog.getByRole('combobox').filter({ hasText: /^선택$/ }).nth(0);

        this.returnUnitWeightInput = this.dialog.locator('div').filter({ hasText: /^반품 단위중량$/ }).locator('input');
        this.vatBtn = this.dialog.getByRole('combobox', { name: '부가세' });
        
        this.remarksInput = this.dialog.locator('input[name="returnRemarks"]');
        this.saveBtn = this.dialog.getByRole('button', { name: '확인' });
    }

    async enterItemDetails(data: YarnReturnData) {
        // 1. Tìm và chọn nguyên liệu từ danh sách bên trái
        if (data.searchYarnName) {
            await this.yarnSearchInput.fill(data.searchYarnName);
            const targetRow = this.dialog.locator('[data-yarn-id]').filter({ hasText: data.searchYarnName }).first();
            await targetRow.waitFor({ state: 'visible' });
            await targetRow.click();
        }

        // 2. Ngày trả hàng
        if (data.returnDate) {
            await this.returnDateInput.fill(data.returnDate);
            await this.returnDateInput.press('Enter');
        }

        // 3. Thông tin 회수지 (Nơi thu hồi)
        if (data.collectionCategory) {
            await this.collectionCategoryBtn.click();
            await this.page.getByRole('option', { name: data.collectionCategory }).click();
        }
        if (data.collectionCompany) {
            await this.collectionCompanyBtn.click();
            await this.page.getByRole('option', { name: data.collectionCompany }).click();
        }

        // 4. Số lượng và Đơn giá trả hàng
        if (data.returnQuantity) await this.returnQuantityInput.fill(data.returnQuantity.toString());
        if (data.returnQuantityUnit) {
            await this.returnQuantityUnitBtn.click();
            await this.page.getByRole('option', { name: data.returnQuantityUnit }).click();
        }

        if (data.returnUnitPrice) await this.returnUnitPriceInput.fill(data.returnUnitPrice.toString());
        if (data.returnUnitPriceUnit) {
            await this.returnUnitPriceUnitBtn.click();
            await this.page.getByRole('option', { name: data.returnUnitPriceUnit }).click();
        }

        // 5. VAT và Ghi chú
        if (data.returnVat) {
            await this.vatBtn.click();
            await this.page.getByRole('option', { name: data.returnVat }).click();
        }
        if (data.returnRemarks) await this.remarksInput.fill(data.returnRemarks);
    }

    async clickSave() {
        // Form yêu cầu điền đủ thông tin mới cho phép nhấn Lưu
        await expect(this.saveBtn).toBeEnabled();
        await this.saveBtn.click();
    }
}