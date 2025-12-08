import { expect, type Locator, type Page } from '@playwright/test';

export type ProductId = 
    | 'sauce-labs-backpack'
    | 'sauce-labs-bike-light'
    | 'sauce-labs-bolt-t-shirt'
    | 'sauce-labs-fleece-jacket'
    | 'sauce-labs-onesie'
    | 'test.allthethings()-t-shirt-(red)';

export class ProductsPage {
    private readonly page: Page;
    // protected readonly cartNumber: Locator;
    protected readonly sortContainer: Locator;
    protected readonly cartLink: Locator;
    

    constructor(page: Page) {
        this.page = page;
        // this.cartNumber = this.page.locator('[data-test="shopping-cart-badge"]');
        this.sortContainer = this.page.locator('[data-test="product-sort-container"]');
        this.cartLink = this.page.locator('[data-test="shopping-cart-link"]');
    }

    public async addToCart(product: ProductId) {
        const addBtn = this.page.locator(`[data-test="add-to-cart-${product}"]`);
        const removeBtn = this.page.locator(`[data-test="remove-${product}"]`);

        await addBtn.scrollIntoViewIfNeeded();
        await addBtn.click();
        await expect(removeBtn).toBeVisible();
    }

    public async removeFromCart(product: ProductId) {               ``
        const removeBtn = this.page.locator(`[data-test="remove-${product}"]`);
        const addBtn = this.page.locator(`[data-test="add-to-cart-${product}"]`);

        await removeBtn.scrollIntoViewIfNeeded();
        await removeBtn.click();
        await expect(addBtn).toBeVisible();
    }

    public async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortContainer.selectOption(option);
    }

    public async openCart() {
        await this.cartLink.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    }


}