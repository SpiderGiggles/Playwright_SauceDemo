import { expect, type Locator, type Page } from '@playwright/test';

export class FirstCheckoutPage {
    private readonly page: Page;
    protected readonly cancelButton: Locator;
    protected readonly continueButton: Locator;
    protected readonly firstName: Locator;
    protected readonly lastName: Locator;
    protected readonly postalCode: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.cancelButton = this.page.locator('[data-test="cancel"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
        this.firstName = this.page.locator('[data-test="firstName"]');
        this.lastName = this.page.locator('[data-test="lastName"]');
        this.postalCode = this.page.locator('[data-test="postalCode"]');
    }

    public async submitInformation(firstname: string, lastname: string, postalcode: string) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.postalCode.fill(postalcode);
        await this.continueButton.click();
    }
}