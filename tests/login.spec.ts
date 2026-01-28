import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Verify admin can login and see raw material codes', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Truy cập trang
  await loginPage.goto();

  // 2. Thực hiện đăng nhập
  await loginPage.login('admin@erp.com', 'Admin@2025');

  // 3. Thao tác điều hướng
  await loginPage.clickMainSection();

  // 4. Kiểm tra kết quả (Assertion)
  await loginPage.verifyContent('원사(원자재) 코드');
});