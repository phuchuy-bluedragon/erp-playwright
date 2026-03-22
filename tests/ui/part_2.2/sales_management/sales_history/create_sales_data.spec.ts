import { test, expect } from '@playwright/test';
// Import dữ liệu từ file JSON của bạn
import salesPayloads from '../../../../fixtures/mock/part_2.2/sales_management/create_sales_data.json';

test.describe('API Data Seeding & Logic Verification', () => {

    test('Step 1: Create sales data via POST API', async ({ request }) => {
        const token = process.env.AUTH_TOKEN;

        for (const payload of salesPayloads) {
            console.log("🚀 Đang gửi dữ liệu này:", JSON.stringify(payload, null, 2));

            const response = await request.post('https://dev.fabric365.co.kr/erpdev/api/sale_history/sale', {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://dev.fabric365.co.kr/admin/sale-management/sale-history',
                    'Origin': 'https://dev.fabric365.co.kr',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                },
                data: payload,
            });

            // --- ĐOẠN DEBUG QUAN TRỌNG ---
            if (!response.ok()) {
                console.error(`❌ Lỗi API tại item: ${payload.type || 'N/A'}`);
                console.error(`Status: ${response.status()} ${response.statusText()}`);
                const errorBody = await response.text(); // Đọc nội dung lỗi dạng chữ
                console.error(`Chi tiết lỗi từ Server: ${errorBody}`);
            }
            // -----------------------------

            expect(response.ok()).toBeTruthy();
            console.log(`✅ Created item thành công!`);
        }
    });

    test('Step 2: Verify Total Calculation after seeding', async ({ request }) => {
        // Sau khi Step 1 chạy xong, gọi GET để tính toán
        const response = await request.get('https://dev.fabric365.co.kr/erpdev/api/sale_history', {
            params: { company: '3cdcc5be-c913-4288-96b8-f9b05e1ecb6b' }
        });

        const body = await response.json();

        // Tính tổng supply_price từ file JSON ban đầu để so sánh
        const expectedSupply = salesPayloads.reduce((sum, item) => sum + item.supply_value, 0);

        // So sánh với con số Server trả về
        expect(body.total_supply).toBe(expectedSupply);
    });
});
