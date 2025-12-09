import { expect, type Locator, type Page } from '@playwright/test';

export class FirstCheckoutPage {
    private readonly page: Page;
    public readonly cancelButton: Locator;
    public readonly continueButton: Locator;
    public readonly firstName: Locator;
    public readonly lastName: Locator;
    public readonly postalCode: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
    }

    public async submitInformation(firstname: string, lastname: string, postalcode: string) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.postalCode.fill(postalcode);
        await this.continueButton.click();
    }
}