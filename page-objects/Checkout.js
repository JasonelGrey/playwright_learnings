import { expect } from "@playwright/test"

export class Checkout {
    constructor(page) {
        this.page = page;
        this.BasketCards = page.locator('[data-qa="basket-card"]');
        this.itemPrices = page.locator('.basket-item-price');
        this.removeFromBasketButtons = page.locator('.basket-card-remove-item');
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');

    }

    removeCheapestProduct = async () => {
        await this.BasketCards.first().waitFor();
        const itemsBeforeRemoval = await this.BasketCards.count();
        await this.itemPrices.first().waitFor();
        const allPriceTexts = await this.itemPrices.allInnerTexts();
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace("$", "");
            return parseInt(withoutDollarSign, 10);
        })
        const smallsetNumber = Math.min(justNumbers);
        const smallestPriceIndex = justNumbers.indexOf(smallsetNumber);
        const specificRemoveButton = this.removeFromBasketButtons.nth(smallestPriceIndex);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        console.log(itemsBeforeRemoval);
        await expect(this.BasketCards).toHaveCount(itemsBeforeRemoval - 1);
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();
        await this.page.waitForURL(/\/login/);

    }

    
}