import { test, expect } from "@playwright/test";
import { Authentication } from "../reusable-steps/authentication";
import { SideNavigationMenu } from "../page-components/navigation-menu";
import { ProductsPage } from "../page-objects/productspage";
import { CartPage } from "../page-objects/cartpage";
import { FirstCheckoutPage } from "../page-objects/firstcheckoutpage";
import { SecondCheckoutPage } from "../page-objects/secondcheckoutpage";

test.describe("Login Tests", () => {
  test("Login Standard User", async ({ page }) => {
    await Authentication.login(page, "standard_user");
  });

  test("Navigate to About", async ({ page }) => {
    await Authentication.login(page, "standard_user");
    const sideNav = new SideNavigationMenu(page);
    await sideNav.selectMenuOption("about");
    await expect(page).toHaveURL("https://saucelabs.com/");
  });

  test("Backpack & Bike Purchase", async ({ page }) => {
    await Authentication.login(page, "standard_user");
    const productPage = new ProductsPage(page);
    await productPage.addToCart("sauce-labs-backpack");
    await productPage.addToCart("sauce-labs-bike-light");
    await productPage.openCart();

    const cartPage = new CartPage(page);
    await cartPage.goToCheckout();

    const checkoutPageOne = new FirstCheckoutPage(page);
    await checkoutPageOne.submitInformation("First", "Last", "12345");

    const checkoutPageTwo = new SecondCheckoutPage(page);
    await checkoutPageTwo.finishOrder();
  });
});

test.describe("Social Media Tests", () => {
  test("X, Fb, Linkedin Tests", async ({ page, context }) => {
    await Authentication.login(page, "standard_user");
    const navigationMenu = new SideNavigationMenu(page);

    const pagePromise = context.waitForEvent("page");
    await navigationMenu.openTwitter();
    const twitterPage = await pagePromise;

    await twitterPage.waitForLoadState();
    expect(twitterPage.url()).toContain("x.com");
    await twitterPage.close();

    const fbPagePromise = context.waitForEvent("page");
    await navigationMenu.openFacebook();
    const fbPage = await fbPagePromise;

    await fbPage.waitForLoadState();
    expect(fbPage.url()).toContain("facebook.com");
    await fbPage.close();

    const linkedinPagePromise = context.waitForEvent("page");
    await navigationMenu.openLinkedIn();
    const linkedinPage = await linkedinPagePromise;

    await linkedinPage.waitForLoadState();
    expect(linkedinPage.url()).toContain("linkedin.com");
    await linkedinPage.close();
  });
});
