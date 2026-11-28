import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/productpage.page';
import { testData } from '../test-data/test-data';

test('TC-06 Sort products by price', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.username, testData.password);
    await expect(page).toHaveURL(/\/inventory\.html$/);

    const productPage = new ProductPage(page);
    await expect(productPage.prices.nth(1)).toBeVisible();

    const prices = (await productPage.prices.allTextContents()).map(price => price.trim());
    for (const price of prices) {
        expect(price).toMatch(/^\$\d+\.\d{2}$/);
    }

    const amount = (price: string) => Number(price.slice(1));
    const ascending = [...prices].sort((a, b) => amount(a) - amount(b));
    const descending = [...ascending].reverse();

    await productPage.sortProducts('lohi');
    await expect(productPage.prices).toHaveText(ascending);

    await productPage.sortProducts('hilo');
    await expect(productPage.prices).toHaveText(descending);
});
