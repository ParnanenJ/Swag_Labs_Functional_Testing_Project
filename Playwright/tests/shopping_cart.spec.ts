import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ShoppingCartPage } from '../pages/shopping_cart.page';
import { testData } from '../test-data/test-data';

test('TC-09 Add product to shopping cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.username, testData.password);

    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.addBackpack();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await shoppingCartPage.openCart();
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.cart_item [data-test="inventory-item-name"]')).toHaveText(testData.productName);
});

test('TC-10 Remove product from shopping cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.username, testData.password);

    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.addBackpack();
    await shoppingCartPage.openCart();

    await shoppingCartPage.removeBackpack();
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
});