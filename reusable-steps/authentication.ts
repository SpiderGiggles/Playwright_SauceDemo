import { type Page } from '@playwright/test';
import { LoginPage } from '../page-objects/loginpage';
import data from '../test-data/users.json';

export class Authentication {
    
  public static async login(page: Page, username: string) {
    const environment = data.testUsers[0];
    const user = environment.swagLabs.users.find(
      (u) => u.username === username
    );
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login(user!.username, user!.password);
  }
}