import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/productpage.page';
import { testData } from '../test-data/test-data';

test('TC-07 Sort products by name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.username, testData.password);
    await expect(page).toHaveURL(/\/inventory\.html$/);

    const productPage = new ProductPage(page);
    await expect(productPage.names.nth(1)).toBeVisible();

    const names = (await productPage.names.allTextContents()).map(name => name.trim());
    const ascending = [...names].sort((a, b) =>
        a.localeCompare(b, 'en', { sensitivity: 'base' })
    );
    const descending = [...ascending].reverse();

    await productPage.sortProducts('za');
    await expect(productPage.names).toHaveText(descending);

    await productPage.sortProducts('az');
    await expect(productPage.names).toHaveText(ascending);
});
