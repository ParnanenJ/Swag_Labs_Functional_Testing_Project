import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ShoppingCartPage } from '../pages/shopping_cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { testData } from '../test-data/test-data';

test('TC-11 Submit checkout form with valid information', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.username, testData.password);

    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.addBackpack();
    await shoppingCartPage.openCart();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.openCheckout();

    await checkoutPage.fillInformation(testData.firstName, testData.lastName, testData.postalCode);
    await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(/checkout-step-two/);

    await checkoutPage.finishOrder();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});

test('TC-12 Submit checkout form with missing information', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.username, testData.password);

    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.addBackpack();
    await shoppingCartPage.openCart();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.openCheckout();

    await page.locator('[data-test="lastName"]').fill(testData.lastName);
    await page.locator('[data-test="postalCode"]').fill(testData.postalCode);
    await checkoutPage.continueCheckout();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');

    await page.locator('[data-test="firstName"]').fill(testData.firstName);
    await page.locator('[data-test="lastName"]').fill('');
    await checkoutPage.continueCheckout();

    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');

    await page.locator('[data-test="lastName"]').fill(testData.lastName);
    await page.locator('[data-test="postalCode"]').fill('');
    await checkoutPage.continueCheckout();
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
});
