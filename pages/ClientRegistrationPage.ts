import { Page, Locator } from '@playwright/test';
import { ClientItemData } from '../types/client_items/client';

export class ClientPage {
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

    async fillForm(data: ClientItemData) {
        // 고객사 기본 정보
        await this.selectOption('고객사 유형', data.clientType);
        await this.page.locator('input[name="companyName"]').fill(data.companyName);
        await this.page.locator('input[name="brandName"]').fill(data.brandName);
        await this.selectOption('고객 등급', data.clientGrade);

        // 사업자 정보
        await this.page.locator('input[name="BusinessRegisterationNo"]').fill(data.businessRegistrationNumber);
        await this.page.getByRole('textbox', { name: '영어, 숫자 포함 8자리 이상' }).fill(data.password);

        await this.page.setInputFiles('input[type="file"]', 'tests/fixtures/image_test.png');

        // 주소
        // await this.page.locator('input[name="headOfficeAddress"]').fill(data.headOfficeAddress);

        
        await this.page.getByRole('textbox', { name: '상세 주소' }).fill(data.detailedAddress);

        // 회사 정보
        await this.page.locator('input[name="salesUrl"]').fill(data.salesUrl);
        await this.page.locator('input[name="companyEmail"]').fill(data.companyEmail);

        // 담당자 정보
        await this.page.locator('input[name="contactName"]').fill(data.contactName);
        await this.page.getByRole('textbox', { name: '선택' }).click();
        await this.page.getByRole('button', { name: data.contactPosition }).click();
        await this.page.locator('input[name="contactPerson"]').fill(data.contactPhoneNumber);

        // 단톡 동의
        await this.selectOption('단톡동의', data.groupChatConsent);

        // 추천인 정보
        await this.page.locator('input[name="company"]').fill(data.referrerCompany);
        await this.page.locator('input[name="brand"]').fill(data.referrerBrand);
        await this.page.locator('input[name="name"]').fill(data.referrerName);
        await this.page.locator('input[name="contact"]').fill(data.referrerPhoneNumber);
    }

    async submit() {
        await this.confirmBtn.click();
    }
}