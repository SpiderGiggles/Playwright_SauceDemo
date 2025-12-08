import { test, expect } from '@playwright/test';
import { Authentication } from '../reusable-steps/authentication';
import { SideNavigationMenu } from '../page-components/navigation-menu';

test.describe('Login Tests', () => {
  
  test('Login User[0]', async ({ page }) => {
    await Authentication.login(page, 'standard_user');
  });

  test('Navigate to About', async ({ page }) => {
    await Authentication.login(page, 'standard_user');
    const sideMenu = new SideNavigationMenu(page);
    await sideMenu.navigateToAbout();
  });
});