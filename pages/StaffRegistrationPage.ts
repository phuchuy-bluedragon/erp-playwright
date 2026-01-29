import { Page, Locator } from '@playwright/test';
import { StaffItemData } from '../types/staff_items/staff';

export class StaffPage {
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

    async fillForm(data: StaffItemData) {
        await this.page.getByRole('textbox', { name: '이름' }).fill(data.staffName);
        await this.page.getByRole('textbox', { name: '이메일 (아이디)' }).fill(data.email);
        await this.page.getByRole('textbox', { name: '연락처' }).first().fill(data.personalPhoneNumber);
        await this.page.getByRole('textbox', { name: '내용 입력' }).fill(data.password);
        await this.page.getByRole('textbox', { name: '연락처' }).last().fill(data.workPhoneNumber);

        // 계약 정보 (combobox / select)
        await this.selectOption('재직 상태', data.employmentStatus);
        await this.page.getByRole('textbox', { name: '날짜 선택' }).first().fill(data.hireDate);
        await this.page.getByRole('textbox', { name: '날짜 선택' }).last().fill(data.terminationDate);

        await this.selectOption('소속팀', data.team);
        await this.selectOption('직책', data.position);
        await this.selectOption('계약형태', data.contractType);
        await this.selectOption('권한그룹', data.roleGroup);

        // 급여 계좌 정보
        await this.selectOption('은행명', data.bankName);
        await this.page.getByRole('spinbutton', { name: '계좌번호' }).fill(data.accountNumber);
        await this.page.getByRole('textbox', { name: '예금주' }).fill(data.accountHolder);
    }


    async submit() {
        await this.confirmBtn.click();
    }
}