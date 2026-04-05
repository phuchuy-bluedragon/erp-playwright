import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';

export interface ReturnRawFabricData {
    fabricPartFilter?: string; // Lọc theo "몸판 등 구분"
    fabricNameSearch?: string; // Tên 품목(생지) để tìm kiếm và chọn
    returnDate?: string;
    collectionCategory?: string; // 회수지 (업체구분)
    collectionCompany?: string; // 회수지 (업체명)
    returnSection?: number; // 반품 절
    returnQuantity?: number; // 반품 수량
    returnQuantityUnit?: string; // 반품 단위 (KG, YD, etc.)
    returnUnitPrice?: number; // 반품 단가
    expectedSupplyValue?: number; // Giá trị 반품 공급가액 mong đợi
    expectedTotal?: number; // Giá trị 반품 합계 mong đợi
    returnVat?: string; // 반품 부가세 (반영, 무시)
    returnRemarks?: string; // 반품사유(비고)
}

export class ReturnRawFabricPage extends BasePage {
    readonly dialog: Locator;

    // Left Section: Fabric Search and Selection
    readonly fabricPartFilterBtn: Locator;
    readonly fabricSearchInput: Locator;
    readonly itemResultRow: (itemName: string) => Locator;

    // Right Section: Return Information
    readonly returnDateInput: Locator;
    readonly collectionCategoryBtn: Locator;
    readonly collectionCompanyBtn: Locator;
    readonly returnSectionInput: Locator;
    readonly returnQuantityInput: Locator;
    readonly returnQuantityUnitBtn: Locator;
    readonly returnUnitPriceInput: Locator;
    readonly returnSupplyValueInput: Locator; // Locator cho 반품 공급가액
    readonly returnVatBtn: Locator;
    readonly returnTotalInput: Locator; // Locator cho 반품 합계
    readonly returnRemarksInput: Locator;

    readonly saveBtn: Locator;
    readonly cancelBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.dialog = page.getByRole('dialog', { name: '품목(생지) 반품 등록' });

        // Left Section Locators
        this.fabricPartFilterBtn = this.dialog.locator('div.w-1\\/3.relative.min-w-0').getByRole('combobox');
        this.fabricSearchInput = this.dialog.getByPlaceholder('품목(생지)명 검색');
        this.itemResultRow = (itemName: string) => this.dialog.locator('div.overflow-y-auto > div.grid.grid-cols-12.cursor-pointer').filter({ hasText: itemName }).first();

        // Right Section Locators
        this.returnDateInput = this.dialog.locator('div').filter({ hasText: /^반품일$/ }).getByPlaceholder('날짜 선택');
        
        const collectionContainer = this.dialog.locator('div').filter({ hasText: /^회수지/ });
        this.collectionCategoryBtn = collectionContainer.getByRole('combobox').first();
        this.collectionCompanyBtn = collectionContainer.getByRole('combobox').last();

        this.returnSectionInput = this.dialog.locator('input[name="threadDensity"]');
        this.returnQuantityInput = this.dialog.locator('input[name="quantity"]');
        this.returnQuantityUnitBtn = this.dialog.locator('div').filter({ hasText: /^반품 수량\/단위$/ }).getByRole('combobox');
        this.returnUnitPriceInput = this.dialog.locator('input[name="unitPrice"]');
        this.returnSupplyValueInput = this.dialog.locator('input[name="supplyValue"]');
        this.returnVatBtn = this.dialog.locator('div').filter({ hasText: /^반품 부가세$/ }).getByRole('combobox');
        this.returnTotalInput = this.dialog.locator('input[name="total"]');
        this.returnRemarksInput = this.dialog.locator('input[name="remarks"]');

        this.saveBtn = this.dialog.getByRole('button', { name: '확인' });
        this.cancelBtn = this.dialog.getByRole('button', { name: '취소' });
    }

    async enterItemDetails(data: ReturnRawFabricData) {
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

        // 2. Điền thông tin 반품 (Return Information)
        if (data.returnDate) {
            await this.returnDateInput.fill(data.returnDate);
            await this.returnDateInput.press('Enter');
        }
        if (data.collectionCategory) {
            await this.collectionCategoryBtn.click();
            await this.page.getByRole('option', { name: data.collectionCategory, exact: true }).click();
        }
        if (data.collectionCompany) {
            await this.collectionCompanyBtn.click();
            await this.page.getByRole('option', { name: data.collectionCompany, exact: true }).click();
        }
        if (data.returnSection) await this.returnSectionInput.fill(data.returnSection.toString());
        if (data.returnQuantity) await this.returnQuantityInput.fill(data.returnQuantity.toString());
        if (data.returnQuantityUnit) {
            await this.returnQuantityUnitBtn.click();
            await this.page.getByRole('option', { name: data.returnQuantityUnit, exact: true }).click();
        }
        if (data.returnUnitPrice) await this.returnUnitPriceInput.fill(data.returnUnitPrice.toString());
        if (data.returnVat) {
            await this.returnVatBtn.click();
            await this.page.getByRole('option', { name: data.returnVat, exact: true }).click();
        }
        if (data.returnRemarks) await this.returnRemarksInput.fill(data.returnRemarks);
    }

    async clickSave() {
        await expect(this.saveBtn).toBeEnabled();
        await this.saveBtn.click();
    }
}