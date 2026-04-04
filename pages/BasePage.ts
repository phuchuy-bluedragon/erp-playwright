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
     * @param openBtnName Tên nút để mở popup (Mặc định: '주소 검색')
     */
    async searchAndSelectAddress(keyword: string, detailAddress: string, openBtnName: string = '주소 검색') {
        const maxRetries = 3;
        let popup: any;
        let isSuccess = false;

        for (let i = 0; i < maxRetries; i++) {
            try {
                // 1. Lắng nghe sự kiện popup TRƯỚC khi click
                const popupPromise = this.page.waitForEvent('popup', { timeout: 5000 });
                
                // 2. Click mở popup
                await this.page.getByRole('button', { name: openBtnName }).click();
                popup = await popupPromise;
                await popup.waitForLoadState();

                // 3. Kiểm tra xem popup có hoạt động không (tìm input #keyword)
                // Nếu sau 3s không thấy input, coi như popup bị lỗi (trắng trang)
                const addressInput = popup.locator('#keyword');
                await addressInput.waitFor({ state: 'visible', timeout: 3000 });
                
                // Nếu chạy đến đây không lỗi tức là popup OK
                await addressInput.fill(keyword);
                await popup.keyboard.press('Enter');
                isSuccess = true;
                break;
            } catch (error) {
                if (!this.page.isClosed()) {
                    console.log(`Lỗi popup lần ${i + 1}, đang thử lại...`);
                }
                if (popup) await popup.close();
                // Đợi một chút trước khi bấm lại
                await this.page.waitForTimeout(1000);
            }
        }

        if (!isSuccess) {
            throw new Error(`Không thể mở popup địa chỉ sau ${maxRetries} lần thử.`);
        }

        // 5. Chọn kết quả từ danh sách trả về (Logic chọn cái đầu tiên)
        // Thay vì hardcode địa chỉ, ta dùng .first() để linh hoạt hơn
        const firstResult = popup.getByRole('link').filter({ hasText: '서울' }).first();
        await firstResult.waitFor({ state: 'visible', timeout: 10000 });
        await firstResult.click();

        // 6. Điền chi tiết và hoàn tất trên popup
        const secondResult = popup.getByRole('textbox', { name: '상세주소' });
        if (await secondResult.isVisible()) {
            await secondResult.fill('123');
        }
        await popup.getByRole('link', { name: '주소입력' }).click();
    }
}
