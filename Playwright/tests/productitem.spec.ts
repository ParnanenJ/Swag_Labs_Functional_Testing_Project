import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductItemPage } from '../pages/productitem.page';
import { testData } from '../test-data/test-data';

test('TC-08 Open product and verify details', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.username, testData.password);
    await expect(page).toHaveURL(/\/inventory\.html$/);

    const productItemPage = new ProductItemPage(page);
    const product = productItemPage.firstProduct;
    const name = (await product.locator('[data-test="inventory-item-name"]').innerText()).trim();
    const description = (await product.locator('[data-test="inventory-item-desc"]').innerText()).trim();
    const price = (await product.locator('[data-test="inventory-item-price"]').innerText()).trim();

    expect(name).not.toBe('');
    expect(description).not.toBe('');
    expect(price).toMatch(/^\$\d+\.\d{2}$/);

    await productItemPage.openFirstProduct();
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
    await expect(productItemPage.name).toHaveText(name);
    await expect(productItemPage.description).toHaveText(description);
    await expect(productItemPage.price).toHaveText(price);
});
