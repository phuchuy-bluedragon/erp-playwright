import { Page, Locator } from '@playwright/test';
import { FabricItemData } from '../types/fabric_items/fabric';

export class FabricPage {
    readonly page: Page;
    readonly registerBtn1: Locator;
    readonly registerBtn2: Locator;
    readonly addBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerBtn1 = page.getByRole('button', { name: '신규 등록(품목)' });
        this.registerBtn2 = page.getByRole('button', { name: '신규 등록(완사입)' });
        this.addBtn = page.getByRole('button', { name: '추가' });
    }

    async selectOption(label: string, optionName: string) {
        await this.page.getByRole('combobox', { name: label }).click();
        await this.page.getByRole('option', { name: optionName }).click();
    }

    async selectOptionNth(index: number, optionName: string) {
        await this.page.getByRole('combobox').nth(index).click();
        await this.page.getByRole('option', { name: optionName }).click();
    }

    async fillForm1(data: FabricItemData) {
        await this.page.locator('input[name="printDesign"]').fill(data.printDesign);
        await this.page.locator('input[name="color"]').fill(data.color);
        await this.page.locator('input[name="btNo"]').fill(data.btNo);

        await this.selectOptionNth(2, data.prodStandard);

        await this.page.getByRole('textbox', { name: '생산단가' }).fill(data.prodPrice);

        await this.selectOptionNth(3, data.prodUnit);

        await this.selectOptionNth(4, data.saleUnit);
        await this.selectOptionNth(5, data.isProdStopped);
        await this.page.getByPlaceholder('0.0').fill(data.allowedLossRate);
        await this.page.locator('input[name="remarks"]').fill(data.remarks);
    }

    async submit() {
        await this.addBtn.click();
    }
}