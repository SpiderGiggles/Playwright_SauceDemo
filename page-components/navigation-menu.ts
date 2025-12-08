import { type Locator, type Page, expect } from '@playwright/test';

export class SideNavigationMenu {
    readonly page: Page;
    protected readonly sideNavLocator;
    protected readonly sideNavAllItems;
    protected readonly sideNavAbout;
    protected readonly sideNavLogout;
    protected readonly sideNavReset;

    constructor(page: Page) {
        this.page = page;
        this.sideNavLocator = this.page.getByText('All ItemsAboutLogoutReset App');
        this.sideNavAllItems = this.page.locator('[data-test="inventory-sidebar-link"]');
        this.sideNavAbout = this.page.locator('[data-test="about-sidebar-link"]');
        this.sideNavLogout = this.page.locator('[data-test="logout-sidebar-link"]');
        this.sideNavReset = this.page.locator('[data-test="reset-sidebar-link"]');
    }

    protected async isSideNavOpen() {
        const box = await this.sideNavLocator.boundingBox();
        if (box!.x <0){
            return false;
        }
        return true;
    }

    protected async openSideNav() {
        if (!(await this.isSideNavOpen())) {
            await this.page.getByRole('button', { name: 'Open Menu' }).click();
            await this.page.waitForTimeout(500);
        }
        await expect(await this.isSideNavOpen()).toBeTruthy();
        return this;
    }

    async navigateToAllItems() {
        await this.openSideNav();
        await this.sideNavAllItems.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

    async navigateToAbout() {
        await this.openSideNav();
        await this.sideNavAbout.click();
        await expect(this.page).toHaveURL('https://saucelabs.com/')
    }

    async navigateToLogout() {
        await this.openSideNav();
        await this.sideNavLogout.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
    }

    async navigateToReset() {
        await this.openSideNav();
        await this.sideNavReset.click();
        await this.page.waitForLoadState('networkidle');
    }
}