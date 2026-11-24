import { Page } from '@playwright/test';

export class ShoppingCartPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addBackpack() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }

    async openCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }

    async removeBackpack() {
        await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    }
}