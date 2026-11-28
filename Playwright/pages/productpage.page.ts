import type { Page } from '@playwright/test';

export class ProductPage {
    constructor(private readonly page: Page) {}

    get prices() {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    get names() {
        return this.page.locator('[data-test="inventory-item-name"]');
    }

    async sortProducts(option: 'lohi' | 'hilo' | 'az' | 'za') {
        await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
    }
}
