import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface RawFabricItemData {
    fabricPartFilter?: string; // Lọc theo "몸판 등 구분"
    fabricNameSearch?: string; // Tên 품목(생지) để tìm kiếm và chọn
    receivingDate?: string;
    category?: string; // 구분 (생산, 구매, 판매)
    section?: number; // 절
    quantity?: number; // 수량
    unitPrice?: number; // 단가
    expectedSupplyValue?: number; // Giá trị 공급가액 mong đợi
    expectedTotal?: number; // Giá trị 합계 mong đợi
    vat?: string; // 부가세 (반영, 무시)
    processingCategory?: string; // 가공의뢰처 (업체구분)
    processingCompany?: string; // 가공의뢰처 (업체명)
    remarks?: string; // 비고
}

export class CreateRawFabricPage extends BasePage {
    readonly dialog: Locator;

    // Left Section: Fabric Search and Selection
    readonly fabricPartFilterBtn: Locator;
    readonly fabricSearchInput: Locator;
    readonly itemResultRow: (itemName: string) => Locator;

    // Right Section: Invoice Information
    readonly receivingDateInput: Locator;
    readonly categoryBtn: Locator;
    readonly sectionInput: Locator;
    readonly quantityInput: Locator;
    readonly unitPriceInput: Locator;
    readonly supplyValueInput: Locator; // Locator cho 공급가액
    readonly totalInput: Locator; // Locator cho 합계
    readonly vatBtn: Locator;
    readonly processingCategoryBtn: Locator;
    readonly processingCompanyBtn: Locator;
    readonly remarksInput: Locator;

    readonly saveBtn: Locator;
    readonly cancelBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.dialog = page.getByRole('dialog', { name: '품목(생지) 송장 등록' });

        // Left Section Locators
        this.fabricPartFilterBtn = this.dialog.locator('div.w-1\\/3.relative.min-w-0').getByRole('combobox');
        this.fabricSearchInput = this.dialog.getByPlaceholder('품목(생지)명 검색');
        // Locator để chọn một hàng cụ thể trong danh sách kết quả
        this.itemResultRow = (itemName: string) => this.dialog.locator('div.overflow-y-auto > div.grid.grid-cols-12.cursor-pointer').filter({ hasText: itemName }).first();

        // Right Section Locators
        this.receivingDateInput = this.dialog.locator('div').filter({ hasText: /^입고일$/ }).getByPlaceholder('날짜 선택');
        this.categoryBtn = this.dialog.getByRole('combobox', { name: '구분' });
        this.sectionInput = this.dialog.locator('input[name="threadDensity"]');
        this.quantityInput = this.dialog.locator('input[name="quantity"]');
        this.unitPriceInput = this.dialog.locator('input[name="unitPrice"]');
        this.supplyValueInput = this.dialog.locator('input[name="supplyValue"]');
        this.totalInput = this.dialog.locator('input[name="total"]');
        this.vatBtn = this.dialog.getByRole('combobox', {name: '부가세'});
        
        this.processingCategoryBtn = this.dialog.getByRole('combobox').filter({ hasText: '구분 선택' });
        this.processingCompanyBtn = this.dialog.getByRole('combobox').filter({ hasText: '업체명 선택' });

        this.remarksInput = this.dialog.locator('input[name="remarks"]');

        this.saveBtn = this.dialog.getByRole('button', { name: '확인' });
        this.cancelBtn = this.dialog.getByRole('button', { name: '취소' });
    }

    async enterItemDetails(data: RawFabricItemData) {
        // 1. Lọc và chọn 품목 (생지)
        if (data.fabricPartFilter) {
            await this.fabricPartFilterBtn.click();
            await this.page.getByRole('option', { name: data.fabricPartFilter, exact: true }).click();
        }
        if (data.fabricNameSearch) {
            await this.fabricSearchInput.fill(data.fabricNameSearch);
            await this.itemResultRow(data.fabricNameSearch).waitFor({ state: 'visible' });
            await this.itemResultRow(data.fabricNameSearch).click();
        }

        // 2. Điền thông tin 송장 (Invoice Information)
        if (data.receivingDate) {
            await this.receivingDateInput.fill(data.receivingDate);
            await this.receivingDateInput.press('Enter');
        }
        if (data.category) {
            await this.categoryBtn.click();
            await this.page.getByRole('option', { name: data.category, exact: true }).click();
        }
        if (data.section) await this.sectionInput.fill(data.section.toString());
        if (data.quantity) await this.quantityInput.fill(data.quantity.toString());
        if (data.unitPrice) await this.unitPriceInput.fill(data.unitPrice.toString());
        if (data.vat) {
            await this.vatBtn.click();
            await this.page.getByRole('option', { name: data.vat, exact: true }).click();
        }
        if (data.processingCategory) {
            await this.processingCategoryBtn.click();
            await this.page.getByRole('option', { name: data.processingCategory, exact: true }).click();
        }
        if (data.processingCompany) {
            await this.processingCompanyBtn.click();
            await this.page.getByRole('option', { name: data.processingCompany, exact: true }).click();
        }
        if (data.remarks) await this.remarksInput.fill(data.remarks);
    }

    async clickSave() {
        await expect(this.saveBtn).toBeEnabled();
        await this.saveBtn.click();
    }
}