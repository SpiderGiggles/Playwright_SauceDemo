import { type Locator, type Page, expect } from "@playwright/test";

export type MenuOption = "inventory" | "about" | "logout" | "reset";

export class SideNavigationMenu {
  readonly page: Page;
  public readonly sideNavContainer: Locator;
  public readonly closeButton: Locator;
  public readonly openButton: Locator;
  public readonly twitterLink: Locator;
  public readonly facebookLink: Locator;
  public readonly linkedinLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sideNavContainer = page.locator(".bm-menu-wrap");
    this.closeButton = page.getByRole("button", { name: "Close Menu" });
    this.openButton = page.getByRole("button", { name: "Open Menu" });
    this.twitterLink = page.locator('[data-test="social-twitter"]');
    this.facebookLink = page.locator('[data-test="social-facebook"]');
    this.linkedinLink = page.locator('[data-test="social-linkedin"]');
  }

  protected async isSideNavOpen(): Promise<boolean> {
    const isVisible = await this.sideNavContainer.isVisible();
    const ariaHidden = await this.sideNavContainer.getAttribute("aria-hidden");
    return isVisible && ariaHidden === "false";
  }

  public async openSideNav() {
    if (!(await this.closeButton.isVisible())) {
      await this.openButton.click();
      await expect(this.closeButton).toBeVisible();
    }
  }

  public async selectMenuOption(option: MenuOption) {
    await this.openSideNav();
    await this.page.locator(`[data-test="${option}-sidebar-link"]`).click();
  }

  public async closeMenu() {
    if (await this.closeButton.isVisible()) {
      await this.closeButton.click();
      await expect(this.closeButton).not.toBeVisible();
    }
  }

  public async openTwitter() {
    await this.twitterLink.scrollIntoViewIfNeeded();
    await this.twitterLink.click();
}

public async openFacebook() {
    await this.facebookLink.scrollIntoViewIfNeeded();
    await this.facebookLink.click();
}

public async openLinkedIn() {
    await this.linkedinLink.scrollIntoViewIfNeeded();
    await this.linkedinLink.click();
}
}
