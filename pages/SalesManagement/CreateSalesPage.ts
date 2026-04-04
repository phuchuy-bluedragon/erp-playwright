import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export interface SalesItemData {
    orderDate?: string;
    fabricName?: string; // Tên mặt hàng để tìm kiếm
    unitType?: 'section' | 'quantity'; // 'section' = 절 수, 'quantity' = 판매량/단위
    sectionCount?: number; // Số lượng 절
    saleQuantity?: number; // Số lượng bán (nếu chọn quantity)
    unitPrice?: number;
    deliveryTarget?: string; // 배송처 (Chọn trong combobox)
    deliveryDestination?: string; // 배송처 (Nhập text)
    contact?: string;        // 연락처 (Nhập text)
    deliveryAddress?: {
        keyword: string;
        detail: string;
    };
    styleNo?: string;
    remarks?: string;
    sectionQuantities?: number[]; // Mảng số lượng cho từng 절 (nếu unitType='section')
}

export class CreateSalesPage extends BasePage {
    readonly dialog: Locator;

    // Date & Search
    readonly orderDateInput: Locator;
    readonly fabricSearchInput: Locator;
    readonly rawFabricResultList: Locator;
    readonly FabricResultList: Locator;

    // Unit & Price
    readonly sectionUnitRadio: Locator;
    readonly qtyUnitRadio: Locator;
    readonly sectionCountInput: Locator;
    readonly saleQuantityInput: Locator;
    readonly unitPriceInput: Locator;

    // Delivery
    readonly addressSearchBtnName: string = '주소검색';
    readonly deliveryTargetBtn: Locator;
    readonly deliveryDestinationInput: Locator;
    readonly contactInput: Locator;
    readonly styleNoInput: Locator;
    readonly remarksInput: Locator;

    // Section Grid Inputs
    readonly sectionInputsContainer: Locator;

    // Footer
    readonly saveBtn: Locator;
    readonly cancelBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.dialog = page.getByRole('dialog');

        this.orderDateInput = this.dialog.getByPlaceholder('날짜 선택');

        // Tìm kiếm nguyên liệu
        this.fabricSearchInput = this.dialog.getByPlaceholder('품목명 검색');

        // Locator chọn phần tử đầu tiên trong danh sách kết quả (dựa vào cấu trúc grid trong dialog)
        this.rawFabricResultList = this.dialog.locator('.overflow-y-auto > div.cursor-pointer').first();

        this.FabricResultList = this.dialog.locator('.overflow-y-auto > div.cursor-pointer').nth(1);


        // Radio Buttons (Dùng getByLabel nhờ thuộc tính 'for' trong HTML)
        this.sectionUnitRadio = this.dialog.getByLabel('절 수');
        this.qtyUnitRadio = this.dialog.getByLabel('판매량/단위');

        this.sectionCountInput = this.dialog.locator('input[name="sectionCount"]');
        this.saleQuantityInput = this.dialog.locator('input[name="saleQuantity"]');
        this.unitPriceInput = this.dialog.locator('input[name="unitPrice"]');

        // Delivery Info
        // Tìm combobox '배송처' dựa trên text hiển thị gần đó vì label không gắn trực tiếp
        this.deliveryTargetBtn = this.dialog.getByRole('combobox').filter({ hasText: '배송지 직접 입력' });
        this.deliveryDestinationInput = this.dialog.locator('input[name="deliveryCompany"]');
        this.contactInput = this.dialog.locator('input[name="deliveryContact"]');

        this.styleNoInput = this.dialog.locator('input[name="styleNo"]');
        this.remarksInput = this.dialog.locator('input[name="deliveryRemarks"]');

        // Container chứa các input nhập số lượng từng 절
        this.sectionInputsContainer = this.dialog.locator('.overflow-x-auto');

        this.saveBtn = this.dialog.getByRole('button', { name: '확인' });
        this.cancelBtn = this.dialog.getByRole('button', { name: '취소' });
    }

    async enterItemDetails(data: SalesItemData) {
        // 1. Ngày đặt hàng
        if (data.orderDate) {
            await this.orderDateInput.fill(data.orderDate);
            await this.orderDateInput.press('Enter');
        }

        // 2. Tìm và chọn mặt hàng
        if (data.fabricName) {
            await this.fabricSearchInput.fill(data.fabricName);
            await this.rawFabricResultList.waitFor({ state: 'visible' }); // Đợi kết quả
            await this.rawFabricResultList.click();
            await this.FabricResultList.waitFor({ state: 'visible' }); // Đợi kết quả thứ 2 (nếu có)
            await this.FabricResultList.click();
        }

        // 3. Chọn đơn vị và số lượng
        if (data.unitType === 'section') {
            await this.sectionUnitRadio.check();
            if (data.sectionCount) await this.sectionCountInput.fill(data.sectionCount.toString());

            // Điền số lượng chi tiết cho từng section (nếu có)
            if (data.sectionQuantities && data.sectionQuantities.length > 0) {
                const inputs = this.sectionInputsContainer.locator('input');
                for (let i = 0; i < data.sectionQuantities.length; i++) {
                    await inputs.nth(i).fill(data.sectionQuantities[i].toString());
                }
            }
        } else if (data.unitType === 'quantity') {
            await this.qtyUnitRadio.check();
            if (data.saleQuantity) await this.saleQuantityInput.fill(data.saleQuantity.toString());
        }

        // 4. Đơn giá
        if (data.unitPrice) await this.unitPriceInput.fill(data.unitPrice.toString());

        // 5. Thông tin giao hàng (배송처 & 연락처)
        if (data.deliveryTarget) {
            await this.deliveryTargetBtn.click();
            // Nếu truyền 'first' thì chọn cái đầu tiên, ngược lại chọn theo tên
            if (data.deliveryTarget === 'first') {
                await this.page.getByRole('option').first().click();
            } else {
                await this.page.getByRole('option', { name: data.deliveryTarget }).click();
            }
        }
        if (data.deliveryDestination) await this.deliveryDestinationInput.fill(data.deliveryDestination);
        if (data.contact) await this.contactInput.fill(data.contact);

        // 5. Địa chỉ và thông tin khác
        if (data.deliveryAddress) {
            // Gọi hàm từ BasePage với tên nút tùy chỉnh '주소검색' (không có dấu cách)
            await this.searchAndSelectAddress(data.deliveryAddress.keyword, data.deliveryAddress.detail, this.addressSearchBtnName);
        }

        if (data.styleNo) await this.styleNoInput.fill(data.styleNo);
        if (data.remarks) await this.remarksInput.fill(data.remarks);
    }

    async clickSave() {
        await expect(this.saveBtn).toBeEnabled();
        await this.saveBtn.click();
    }
}