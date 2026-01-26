import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    public readonly usernameInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;
    public readonly lockedErrorMessage: Locator;


    constructor(private readonly page: Page) {
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.lockedErrorMessage = page.locator('[data-test="error"]');
    }

    public async goTo() {
        const response = await this.page.goto('https://www.saucedemo.com/');
        expect(response?.request().method()).toBe('GET');
        expect(response?.status()).toBe(200);
    }

    public async correctPageLand() {
        await expect(this.page).toHaveURL(/.*inventory/);
    }

    public async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async lockedoutError() {
        await expect(this.lockedErrorMessage).toBeVisible();
    }
}