import { Page, Locator } from '@playwright/test';
import { BusinessItemData } from '../types/business_items/business';

export class BusinessPage {
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

    async fillForm(data: BusinessItemData) {
        await this.selectOption('업체 구분', data.businessPart);
        await this.page.getByRole('textbox', { name: '업체명' }).fill(data.businessName);
        await this.page.getByRole('textbox', { name: '사업자 등록번호' }).fill(data.businessRegistrationNumber);
        await this.page.getByRole('textbox', { name: '일반전화' }).fill(data.phoneNumber);
        await this.page.getByRole('textbox', { name: '팩스' }).fill(data.faxNumber);
        // await this.page.locator('[id="_r_o8_-form-item"]').fill(data.headOfficeAddress);

        // 1. Lắng nghe sự kiện popup TRƯỚC khi click nút tìm kiếm
        const popupPromise = this.page.waitForEvent('popup');

        // 2. Click vào nút mở popup tìm kiếm địa chỉ
        // Thay '주소 검색' bằng chính xác tên nút trên giao diện của bạn
        await this.page.getByRole('button', { name: '주소 검색' }).click();

        // 3. Đợi popup xuất hiện và điều khiển nó
        const popup = await popupPromise;
        await popup.waitForLoadState(); // Đảm bảo trang popup đã tải xong

        // 4. Thao tác trên giao diện 도로명주소
        // Thông thường id của ô nhập là #keyword hoặc dùng placeholder '도로명주소, 건물명 hoặc 지번'
        const addressInput = popup.locator('#keyword');
        await addressInput.fill(data.headOfficeAddress);
        await popup.keyboard.press('Enter');

        // 5. Chọn kết quả từ danh sách trả về
        // Hệ thống này thường hiển thị kết quả trong các thẻ <a> hoặc <dl>
        // Chúng ta đợi cho kết quả xuất hiện rồi click vào cái đầu tiên
        const firstResult = popup.getByRole('link', { name: '서울특별시 강남구 테헤란로 152' }).first();
        await firstResult.waitFor({ state: 'visible', timeout: 10000 });
        await firstResult.click();

        const secondResult = popup.getByRole('textbox', { name: '상세주소' });
        await secondResult.fill('123');
        
        await popup.getByRole('link', { name: '주소입력' }).click();
        // 6. Sau khi click kết quả, popup sẽ tự đóng. 
        // Chúng ta đợi nó đóng hẳn để tránh lỗi xung đột trên trang chính
        await popup.waitForEvent('close');

        await this.page.getByRole('textbox', { name: '상세 주소' }).fill(data.detailedAddress);
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

    async submit() {
        await this.confirmBtn.click();
    }
}