import { Page, Locator } from '@playwright/test';
import { YarnItemData } from '../types/yarn_items/yarn';

export class YarnPage {
    readonly page: Page;
    readonly registerBtn: Locator;
    readonly confirmBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerBtn = page.getByRole('button', { name: '신규 등록' });
        this.confirmBtn = page.getByRole('button', { name: '확인' });
    }

    async selectOption(label: string, optionName: string) {
        await this.page.getByRole('combobox', { name: label }).click();
        await this.page.getByRole('option', { name: optionName }).click();
    }

    async fillForm(data: YarnItemData) {
        await this.selectOption('원사구분', data.yarnPart);

        await this.page.getByRole('textbox', { name: '원사명' }).fill(data.itemName);
        await this.page.getByRole('textbox', { name: '원사 색상 (컬러입력가능)' }).fill(data.itemColor);
        await this.page.getByRole('textbox', { name: '비고' }).fill(data.remarks);
    }

    async submit() {
        await this.confirmBtn.click();
    }
}