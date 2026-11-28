import type { Page } from '@playwright/test';

export class ProductItemPage {
    constructor(private readonly page: Page) {}

    get firstProduct() {
        return this.page.locator('[data-test="inventory-item"]').first();
    }

    get name() {
        return this.page.locator('[data-test="inventory-item-name"]');
    }

    get description() {
        return this.page.locator('[data-test="inventory-item-desc"]');
    }

    get price() {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    async openFirstProduct() {
        await this.firstProduct.locator('[data-test="inventory-item-name"]').click();
    }
}
