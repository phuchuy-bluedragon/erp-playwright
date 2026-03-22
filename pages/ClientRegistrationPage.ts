import { Page, Locator } from '@playwright/test';
import { ClientItemData } from '../types/client_items/client';
import { BasePage } from './BasePage';

export class ClientPage extends BasePage {
    readonly registerBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.registerBtn = page.getByRole('button', { name: '신규 등록' });
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
        await this.searchAndSelectAddress(data.headOfficeAddress, data.detailedAddress);

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
}