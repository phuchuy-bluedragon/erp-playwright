import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly confirmBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.confirmBtn = page.getByRole('button', { name: '확인' });
    }

    /**
     * Chọn một option từ combobox
     */
    async selectOption(label: string, optionName: string) {
        await this.page.getByRole('combobox', { name: label }).click();
        await this.page.getByRole('option', { name: optionName }).click();
    }

    /**
     * Click nút xác nhận (Lưu form)
     */
    async submit() {
        await this.confirmBtn.click();
    }

    /**
     * Xử lý logic tìm kiếm địa chỉ qua Popup
     * @param keyword Từ khóa tìm kiếm (VD: địa chỉ chính)
     * @param detailAddress Địa chỉ chi tiết cần điền sau khi chọn
     */
    async searchAndSelectAddress(keyword: string, detailAddress: string) {
        // 1. Lắng nghe sự kiện popup TRƯỚC khi click nút tìm kiếm
        const popupPromise = this.page.waitForEvent('popup');

        // 2. Click vào nút mở popup tìm kiếm địa chỉ
        await this.page.getByRole('button', { name: '주소 검색' }).click();

        // 3. Đợi popup xuất hiện và điều khiển nó
        const popup = await popupPromise;
        await popup.waitForLoadState();

        // 4. Thao tác trên giao diện popup
        const addressInput = popup.locator('#keyword');
        await addressInput.fill(keyword);
        await popup.keyboard.press('Enter');

        // 5. Chọn kết quả từ danh sách trả về (Logic chọn cái đầu tiên)
        const firstResult = popup.getByRole('link', { name: '서울특별시 강남구 테헤란로 152' }).first();
        await firstResult.waitFor({ state: 'visible', timeout: 10000 });
        await firstResult.click();

        // 6. Điền chi tiết và hoàn tất trên popup
        // Lưu ý: Logic này giả định popup yêu cầu nhập thêm thông tin phụ '123' trước khi đóng
        const secondResult = popup.getByRole('textbox', { name: '상세주소' });
        await secondResult.fill('123');

        await popup.getByRole('link', { name: '주소입력' }).click();

        // 7. Điền địa chỉ chi tiết vào form chính
        await this.page.getByRole('textbox', { name: '상세 주소' }).fill(detailAddress);
    }
}
