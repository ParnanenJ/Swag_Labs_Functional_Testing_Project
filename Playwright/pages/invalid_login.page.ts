import { Page } from '@playwright/test';

export class InvalidLogin {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoURL() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async invalidCredentials(username: string, password: string) {
        await this.page.locator('[data-test="username"]').fill(username);
        await this.page.locator('[data-test="password"]').fill(password);
        await this.page.locator('[data-test="login-button"]').click();
    }
}