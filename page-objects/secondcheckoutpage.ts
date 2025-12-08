import { expect, type Locator, type Page } from '@playwright/test';

export class SecondCheckoutPage {
    private readonly page: Page;
    public readonly continueButton;
    public readonly cancelButton;
    public readonly backToProducts;
    

    constructor(page: Page) {
        this.page = page;
        this.continueButton = this.page.locator('[data-test="finish"]');
        this.cancelButton = this.page.locator('[data-test="cancel"]');
        this.backToProducts = this.page.locator('[data-test="back-to-products"]');
    }

    public async finishOrder() {
        await this.continueButton.click();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
        await this.backToProducts.click();
    }

    public async cancelOrder() {
        await this.cancelButton.click();
        // await expect(this.page).toHaveURL("");
    }
}