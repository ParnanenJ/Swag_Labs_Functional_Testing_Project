import { Page, Locator, expect } from '@playwright/test';

export class Menu {
    readonly page: Page;
    readonly allItemsBtn: Locator;
    readonly dynamicCatalogBtn: Locator;
    readonly aboutBtn: Locator;
    readonly logoutBtn: Locator;
    readonly resetBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allItemsBtn = page.locator('#inventory_sidebar_link');
        this.dynamicCatalogBtn = page.locator('#dynamic_catalog_sidebar_link');
        this.aboutBtn = page.locator('#about_sidebar_link');
        this.logoutBtn = page.locator('#logout_sidebar_link');
        this.resetBtn = page.locator('#reset_sidebar_link');
    }

    async openMenu() {
        await this.page.locator('#react-burger-menu-btn').click();
    }

    async closeMenu() {
        await this.page.locator('#react-burger-cross-btn').click();
    }

    async menuBtnsShown() {
        await expect(this.allItemsBtn).toBeVisible();
        await expect(this.dynamicCatalogBtn).toBeVisible();
        await expect(this.aboutBtn).toBeVisible();
        await expect(this.logoutBtn).toBeVisible();
        await expect(this.resetBtn).toBeVisible();
        
    }
}