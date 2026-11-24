import { Page } from '@playwright/test';

export class CheckoutPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openCheckout() {
        await this.page.locator('[data-test="checkout"]').click();
    }

    async fillInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator('[data-test="firstName"]').fill(firstName);
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    }

    async continueCheckout() {
        await this.page.locator('[data-test="continue"]').click();
    }

    async finishOrder() {
        await this.page.locator('[data-test="finish"]').click();
    }
}