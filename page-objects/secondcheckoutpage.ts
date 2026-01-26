import { expect, type Locator, type Page } from '@playwright/test';

export class SecondCheckoutPage {
    public readonly continueButton: Locator;
    public readonly cancelButton: Locator;
    public readonly backToProducts: Locator;


    constructor(private readonly page: Page) {
        this.continueButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.backToProducts = page.locator('[data-test="back-to-products"]');
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