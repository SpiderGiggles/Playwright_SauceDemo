import { expect, type Locator, type Page } from '@playwright/test';

export type ProductId =
    | 'sauce-labs-backpack'
    | 'sauce-labs-bike-light'
    | 'sauce-labs-bolt-t-shirt'
    | 'sauce-labs-fleece-jacket'
    | 'sauce-labs-onesie'
    | 'test.allthethings()-t-shirt-(red)';

export class CartPage {
    public readonly continueShopping: Locator;
    public readonly checkoutPage: Locator;


    constructor(private readonly page: Page) {
        this.continueShopping = page.locator('[data-test="continue-shopping"]');
        this.checkoutPage = page.locator('[data-test="checkout"]');
    }

    public async backToInventory() {
        await this.continueShopping.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

    public async goToCheckout() {
        await this.checkoutPage.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    }
}