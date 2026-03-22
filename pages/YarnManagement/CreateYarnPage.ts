import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface YarnInvoiceData {
    date?: string;
    yarnName?: string;
    receiverCategory?: string;
    receiverCompany?: string;
    quantity?: number;
    quantityUnit?: string;
    price?: number;
    priceUnit?: string;
    vat?: string;
    remarks?: string;
}

export class CreateYarnPage extends BasePage {
    readonly dialog: Locator;

    // Inputs
    readonly dateInput: Locator;
    readonly yarnSearchInput: Locator;
    readonly quantityInput: Locator;
    readonly unitPriceInput: Locator;
    readonly remarksInput: Locator;

    // Selection List
    readonly firstYarnResult: Locator;

    // Comboboxes (Buttons in Radix UI)
    readonly receiverCategoryBtn: Locator;
    readonly receiverCompanyBtn: Locator;
    readonly quantityUnitBtn: Locator;
    readonly priceUnitBtn: Locator;
    readonly vatBtn: Locator;

    // Buttons
    readonly saveBtn: Locator;
    readonly cancelBtn: Locator;

    constructor(page: Page) {
        super(page);
        // Scope tất cả selector vào trong Dialog để tránh nhầm lẫn với nền
        this.dialog = page.getByRole('dialog');

        // Định nghĩa selector dựa trên HTML
        this.dateInput = this.dialog.getByPlaceholder('날짜 선택');
        this.yarnSearchInput = this.dialog.getByPlaceholder('원사명 검색');

        // Input số lượng và đơn giá có cùng placeholder="0". 
        // Dựa vào thứ tự xuất hiện trong HTML: Số lượng (first) -> Đơn giá (second)
        this.quantityInput = this.dialog.getByPlaceholder('0').first();
        this.unitPriceInput = this.dialog.getByPlaceholder('0').nth(1);

        this.remarksInput = this.dialog.locator('input[name="remarks"]');

        // Kết quả tìm kiếm nguyên liệu (chọn dòng đầu tiên)
        this.firstYarnResult = this.dialog.locator('[data-yarn-id]').first();

        // Comboboxes: Dựa vào text hiển thị trên nút hoặc label
        this.receiverCategoryBtn = this.dialog.getByRole('combobox').filter({ hasText: '구분 선택' });
        this.receiverCompanyBtn = this.dialog.getByRole('combobox').filter({ hasText: '업체명 선택' });

        // Các nút "Chọn" (선택) đơn vị xuất hiện theo thứ tự:
        // 1. Đơn vị số lượng -> 2. Đơn vị tiền tệ
        const selectButtons = this.dialog.getByRole('combobox').filter({ hasText: /^선택$/ });
        this.quantityUnitBtn = selectButtons.nth(0);
        this.priceUnitBtn = selectButtons.nth(1);

        // VAT Button: Tìm theo label "부가세" thay vì text bên trong nút (vì text có thể là "반영" hoặc "미반영")
        // Label "부가세" có for="_r_bb_-form-item" khớp với id của nút
        this.vatBtn = this.dialog.getByRole('combobox', { name: '부가세' });

        this.saveBtn = this.dialog.getByRole('button', { name: '확인' });
        this.cancelBtn = this.dialog.getByRole('button', { name: '취소' });
    }

    /**
     * Điền toàn bộ thông tin vào form
     */
    async enterItemDetails(data: YarnInvoiceData) {
        // 1. Nhập ngày
        if (data.date) {
            await this.dateInput.fill(data.date);
            await this.dateInput.press('Enter');
        }

        // 2. Tìm và chọn nguyên liệu
        if (data.yarnName) {
            await this.yarnSearchInput.fill(data.yarnName);
            // Đợi danh sách lọc xong và click kết quả đầu tiên
            await this.firstYarnResult.waitFor({ state: 'visible' });
            await this.firstYarnResult.click();
        }

        // 3. Thông tin bên nhận (Receiver)
        if (data.receiverCategory) {
            await this.receiverCategoryBtn.click();
            await this.page.getByRole('option', { name: data.receiverCategory }).click();
        }
        if (data.receiverCompany) {
            await this.receiverCompanyBtn.click();
            await this.page.getByRole('option', { name: data.receiverCompany }).click();
        }

        // 4. Số lượng và Đơn vị
        if (data.quantity) {
            await this.quantityInput.fill(data.quantity.toString());
        }
        if (data.quantityUnit) {
            await this.quantityUnitBtn.click();
            await this.page.getByRole('option', { name: data.quantityUnit }).click();
        }

        // 5. Đơn giá và Đơn vị tiền tệ
        if (data.price) {
            await this.unitPriceInput.fill(data.price.toString());
        }
        if (data.priceUnit) {
            await this.priceUnitBtn.click();
            await this.page.getByRole('option', { name: data.priceUnit }).click();
        }

        // 6. VAT
        if (data.vat) {
            await this.vatBtn.click();
            await this.page.getByRole('option', { name: data.vat }).click();
        }

        // 7. Ghi chú
        if (data.remarks) {
            await this.remarksInput.fill(data.remarks);
        }
    }

    /**
     * Nhấn nút Lưu (Confirm)
     */
    async clickSave() {
        // Đợi nút enable trước khi click (nếu có logic validate)
        await expect(this.saveBtn).toBeEnabled();
        await this.saveBtn.click();
    }
}