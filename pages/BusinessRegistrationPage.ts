import { Page, Locator } from '@playwright/test';
import { BusinessItemData } from '../types/business_items/business';
import { BasePage } from './BasePage';

export class BusinessPage extends BasePage {
    readonly registerBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.registerBtn = page.getByRole('button', { name: '신규 등록' });
    }

    async fillForm(data: BusinessItemData) {
        await this.selectOption('업체 구분', data.businessPart);
        await this.page.getByRole('textbox', { name: '업체명' }).fill(data.businessName);
        await this.page.getByRole('textbox', { name: '사업자 등록번호' }).fill(data.businessRegistrationNumber);
        await this.page.getByRole('textbox', { name: '일반전화' }).fill(data.phoneNumber);
        await this.page.getByRole('textbox', { name: '팩스' }).fill(data.faxNumber);
        // await this.page.locator('[id="_r_o8_-form-item"]').fill(data.headOfficeAddress);

        await this.searchAndSelectAddress(data.headOfficeAddress, data.detailedAddress);

        await this.page.getByRole('textbox', { name: '담당자명' }).fill(data.contactName);
        await this.page.getByRole('textbox', { name: '직책' }).fill(data.contactPosition);
        await this.page.getByRole('textbox', { name: '담당자 이메일' }).fill(data.contactEmail);
        await this.page.getByRole('textbox', { name: '담당자 연락처' }).fill(data.contactPhone);
        await this.selectOption('(당사) 업체담당자', data.companyAccountManager);
        await this.selectOption('VAT 여부', data.vatApplicable);
        await this.page.getByRole('textbox', { name: '비고' }).fill(data.remarks);
        await this.page.locator('span:has-text("은행 선택")').click();
        await this.page.getByRole('option', { name: data.bankName }).click();
        await this.page.getByRole('textbox', { name: '계좌주' }).fill(data.accountHolder);
        await this.page.getByRole('textbox', { name: '통장 표시' }).fill(data.accountDisplayName);
        await this.page.getByRole('textbox', { name: '계좌번호 \'-\'제외 입력' }).fill(data.accountNumber);
    }
}