import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly mainSection: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    this.page = page;
    // Định nghĩa các Locator dựa trên script của bạn
    this.emailInput = page.getByRole('textbox', { name: '이메일 입력' });
    this.passwordInput = page.getByRole('textbox', { name: '비밀번호 입력' });
    this.loginButton = page.getByRole('button', { name: '로그인' });
    this.mainSection = page.locator('section').filter({ hasText: /^메인$/ });
    this.mainContent = page.getByRole('main');
  }

  async goto() {
    await this.page.goto('https://dev.fabric365.co.kr/admin/login');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.pressSequentially(pass, { delay: 100 });
    await this.loginButton.click();
  }

  async clickMainSection() {
    await this.mainSection.click();
  }

  async verifyContent(text: string) {
    await expect(this.mainContent).toContainText(text);
  }
}