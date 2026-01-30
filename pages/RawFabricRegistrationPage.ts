import { Page, Locator } from '@playwright/test';
import { YarnComposition, RawFabricItemData1 } from '../types/raw_fabric_items/raw_fabric_1';
import { RawFabricItemData2 } from '../types/raw_fabric_items/raw_fabric_2';


export class RawFabricPage {
    readonly page: Page;
    readonly registerBtn1: Locator;
    readonly registerBtn2: Locator;
    readonly confirmBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerBtn1 = page.getByRole('button', { name: '신규 등록(품목)' });
        this.registerBtn2 = page.getByRole('button', { name: '신규 등록(완사입)' });
        this.confirmBtn = page.getByRole('button', { name: '확인' });
    }

    async selectOption(label: string, optionName: string) {
        await this.page.getByRole('combobox', { name: label }).click();
        await this.page.getByRole('option', { name: optionName }).click();
    }

    async fillForm1(data: RawFabricItemData1) {
        await this.selectOption('몸판 등 구분', data.fabricPart);
        await this.selectOption('업체 구분', data.businessCategory);
        await this.page.getByRole('combobox', { name: "제작처 (업체명)" }).click();
        await this.page.getByRole('option').first().click();

        await this.selectOption('생산단위', data.prodUnit);
        await this.selectOption('판매단위', data.saleUnit);
        await this.selectOption('판매종료', data.isSaleEnded);

        await this.page.getByRole('textbox', { name: '품목명' }).fill(data.itemName);
        await this.page.getByRole('textbox', { name: '비고' }).fill(data.remarks);
    }

    async fillForm2(data: RawFabricItemData2) {
        await this.selectOption('몸판 등 구분', data.fabricPart);
        await this.selectOption('업체 구분', data.businessCategory);
        await this.page.getByRole('combobox', { name: "제작처 (업체명)" }).click();
        await this.page.getByRole('option').first().click();
        await this.selectOption('구매단위', data.purchaseUnit);
        await this.selectOption('판매단위', data.saleUnit);
        await this.selectOption('판매종료', data.isSaleEnded);

        await this.page.getByRole('textbox', { name: '구매 시 품목명' }).fill(data.purchaseItemName);
        await this.page.getByRole('textbox', { name: '판매 시 품목명' }).fill(data.saleItemName);
        await this.page.getByRole('textbox', { name: '비고' }).fill(data.remarks);
    }

    async selectAndFillYarns(yarns: YarnComposition[]) {
        // Chúng ta dùng index (0, 1) để ánh xạ vào các nth() của bạn
        for (const [i, yarn] of yarns.entries()) {

            // 1. Chọn dòng (Dựa trên locator cell/row bạn đã tìm thấy)
            // Nếu i = 0 (yarn 1), nó sẽ thao tác với bộ locator đầu tiên
            // Nếu i = 1 (yarn 2), nó sẽ thao tác với bộ locator tiếp theo

            if (i === 0) {
                // Lượt 1: Điền vào dòng đầu tiên (hoặc bộ đầu tiên)
                await this.page.getByRole('cell').first().click();
                await this.page.getByRole('row').getByRole('spinbutton').first().fill(yarn.ratio);
                await this.page.getByRole('row').getByPlaceholder('0.0').first().fill(yarn.loss);
            } else {
                // Lượt 2: Điền vào dòng thứ hai (hoặc bộ thứ hai)
                // Bạn cần sử dụng đúng nth để trỏ vào dòng tiếp theo
                await this.page.getByRole('cell').nth(4).click(); // Theo logic nth(4) của bạn
                await this.page.getByRole('row').getByRole('spinbutton').nth(i).fill(yarn.ratio);
                await this.page.getByRole('row').getByPlaceholder('0.0').nth(i).fill(yarn.loss);
            }

            // Đợi UI cập nhật một chút (ERP thường cần thời gian tính toán tổng %)
            await this.page.waitForTimeout(500);
        }
    }

    async submit() {
        await this.confirmBtn.click();
    }
}