import { expect } from "@playwright/test"
import { isDesktopViewport } from "../utils/isDesktopViewport";

export class Navigation {
    constructor (page) {
        this.page = page;
        this.basketCounter = page.locator('.header-basket-count');
        this.checkoutButton = page.getByRole('link', {name:'Checkout'});
        this.burgerButton = page.locator('.burger-button');
    }

    
    getBasketCount = async () => {
        await this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        return parseInt(text, 10);
    }

    goToCheckout = async () => {
        if(!isDesktopViewport(this.page)) {
            await this.burgerButton.waitFor();
            await this.burgerButton.click();
        }
        await this.checkoutButton.waitFor();
        await this.checkoutButton.click();
        await this.page.waitForURL("/basket");
        console.log("Hello");
    }

}
