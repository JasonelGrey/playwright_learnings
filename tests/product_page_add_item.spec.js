import { test, expect } from "@playwright/test"

test.skip("Product page add to Basket", async ({ page }) => {
    await page.goto("/");

    const addToBasketButton = page.locator('.product-button').first();
    const basketCounter = page.locator('.header-basket-count')
    await expect(addToBasketButton.first()).toHaveText('Add to Basket');
    await expect(basketCounter).toHaveText("0");

    await addToBasketButton.click();

    await expect(addToBasketButton.first()).toHaveText('Remove from Basket');
    await expect(basketCounter).toHaveText("1");
    const checkoutLink = page.locator('.monitor-navigation >div >div:nth-child(3)');
    await checkoutLink.click();
    await page.waitForURL("/basket");
    page.pause();
});

