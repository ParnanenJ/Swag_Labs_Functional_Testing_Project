import { Page } from '@playwright/test';

export class Logout {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clicklLogout() {
        await this.page.locator('#logout_sidebar_link').click();
    }
}