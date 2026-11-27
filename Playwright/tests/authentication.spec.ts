import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InvalidLogin } from '../pages/invalid_login.page';
import { Logout } from '../pages/logout.page';
import { testData } from '../test-data/test-data';


test('TC-01 Login With Valid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.username, testData.password);

    await expect(page).toHaveURL(/inventory/);
    const virhe = page.locator('[data-test="error"]');
    await expect(virhe).not.toBeVisible();
});

test('TC-02 Login With Invalid Credentials', async ({ page }) => {
    const invalidLogin = new InvalidLogin(page);
    invalidLogin.gotoURL();

    invalidLogin.invalidCredentials(testData.invalidUsername, testData.invalidPassword)
    let error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Epic sadface: Username and password do not match any user in this service');

    invalidLogin.invalidCredentials(testData.username, testData.invalidPassword)
    error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Epic sadface: Username and password do not match any user in this service');

    invalidLogin.invalidCredentials(testData.invalidUsername, testData.password)
    error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Epic sadface: Username and password do not match any user in this service');

    invalidLogin.invalidCredentials(testData.username, '')
    error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Epic sadface: Password is required');

    invalidLogin.invalidCredentials('', testData.password)
    error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Epic sadface: Username is required');

});

test('TC-05 Logout Using Menu', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.username, testData.password);

    await expect(page).toHaveURL(/inventory/);
    let error = page.locator('[data-test="error"]');
    await expect(error).not.toBeVisible();

    const logout = new Logout(page);
    await logout.openMenu()
    await expect(page.locator('.bm-menu-wrap')).toHaveAttribute('aria-hidden', 'false');

    await logout.clicklLogout()

    await expect(page).toHaveURL('https://www.saucedemo.com');
    error = page.locator('[data-test="error"]');
    await expect(error).not.toBeVisible();
});