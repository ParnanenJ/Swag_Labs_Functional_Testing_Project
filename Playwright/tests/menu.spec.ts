import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { Menu } from '../pages/menu.page'
import { testData } from '../test-data/test-data';


test('TS-03 Open The Menu', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const menu = new Menu(page);

    await loginPage.login(testData.username, testData.password);
    await expect(page).toHaveURL(/inventory/);

    await menu.openMenu();
    await expect(page.locator('.bm-menu-wrap')).toHaveAttribute('aria-hidden', 'false');
    await menu.menuBtnsShown();
    
    const error = page.locator('[data-test="error"]');
    await expect(error).not.toBeVisible();
});

test('TS-04 Close The Menu', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const menu = new Menu(page);

    await loginPage.login(testData.username, testData.password);
    await expect(page).toHaveURL(/inventory/);
    await menu.openMenu();

    await menu.closeMenu()
    await expect(page.locator('.bm-menu-wrap')).toHaveAttribute('aria-hidden', 'true');
    const error = page.locator('[data-test="error"]');
    await expect(error).not.toBeVisible();
    
});