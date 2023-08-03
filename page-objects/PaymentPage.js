import { expect } from "@playwright/test"

export class PaymentPage {
    constructor (page) {
        this.page = page;
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]');
        this.discountCodeInput = page.locator('.discount-code-input');
        this.activateDiscountButton = page.locator('.submit-discount-button');
        this.discounActiveMessage = page.locator('.discount-active-message');
        this.regularValue = page.locator('.total-value');
        this.discountValue = page.locator('.total-with-discount-value');
        this.creditCardOwnerField = page.locator('.credit-card-owner');
        this.creditCardNumberFiled = page.locator('.credit-card-number');
        this.ValidUntilField = page.locator('.valid-until');
        this.creditCardCVCField = page.locator('.credit-card-cvc');
        this.payButton = page.locator('.pay-button');
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        //Option 1
        await this.discountCodeInput.fill(code);
        await expect(this.discountCodeInput).toHaveValue(code);

        await expect(this.discountValue).toBeHidden();
        await expect(this.discountValue).toBeHidden();
        await this.activateDiscountButton.waitFor();
        await this.activateDiscountButton.click();
        await expect(this.discounActiveMessage).toBeVisible();
        await expect(this.discountValue).toBeVisible();

        let regularPrice = await this.regularValue.innerText();
        regularPrice = parseInt(regularPrice.replace("$","")), 10;

        let discountPrice = await this.discountValue.innerText();
        discountPrice = parseInt(discountPrice.replace("$","")), 10;
        expect(regularPrice).toBeGreaterThan(discountPrice);

        //option 2 slow typing
        //await this.discountCodeInput.focus();
        //await this.page.keyboard.type(code, {delay:1000});
        //expect(await this.discountCodeInput.inputValue()).toBe(code);

    }
    fillPaymentDetails = async (pm) => {
        await this.creditCardOwnerField.waitFor();
        await this.creditCardOwnerField.fill(pm.cardOwner);
        await this.creditCardNumberFiled.fill(pm.cardNumber);
        await this.ValidUntilField.fill(pm.validUntil);
        await this.creditCardCVCField.fill(pm.cvcCode);
    }

    completePayment = async () => {
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForURL(/\/thank-you/);
    }


}