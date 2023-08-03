import { expect } from "@playwright/test";
import { Navigation } from "./Navigation.js";
import { isDesktopViewport } from "../utils/isDesktopViewport.js";

export class ProductsPage {
    constructor (page) {
        this.page = page;
        this.AddButtons = page.locator('[data-qa="product-button"]');
        this.basketCounter = page.locator('.header-basket-count');
        this.sortDropdowm = page.locator('.sort-dropdown');
        this.productTitle = page.locator('.product-title');
    }

    visit = async () => {
        await this.page.goto("/");
    }

    addProductToTheBasket = async (index) => {
        const specificAddButton = this.AddButtons.nth(index);
        await specificAddButton.waitFor();
        await expect(specificAddButton).toHaveText("Add to Basket");
        const navigation = new Navigation(this.page);
        let BasketCountBeforeAdding;
        if (isDesktopViewport(this.page)) {
            BasketCountBeforeAdding =  await navigation.getBasketCount();
        }
        
        await specificAddButton.click();
        await expect(specificAddButton).toHaveText("Remove from Basket");
     
        if (isDesktopViewport(this.page)) {
            const BasketCountAfterAdding = await navigation.getBasketCount();
            expect(BasketCountAfterAdding).toBeGreaterThan(BasketCountBeforeAdding);
        }
        
    }

    sortByCheapest =  async () => {
        await this.sortDropdowm.waitFor();
        await this.productTitle.first().waitFor();
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();
        await this.sortDropdowm.selectOption("price-asc");
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts();
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);

    }
}