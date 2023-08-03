import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor (page) {
        this.page = page;
        this.firstNameField = page.getByPlaceholder('First name');
        this.lastNameField = page.getByPlaceholder('Last name');
        this.streetField = page.getByPlaceholder('Street');
        this.postCodeField = page.getByPlaceholder('Post code');
        this.cityField = page.getByPlaceholder('City');
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
        this.saveAddressButton = page.locator('.save-address-button')
        this.savedAddressBlock = page.locator('.saved-address-container')
        this.savedAddressFirstName = page.locator('.saved-address-firstName');
        this.savedAddresslastName = page.locator('.saved-address-lastName');
        this.savedAddressStreet = page.locator('.saved-address-street');
        this.savedAddressPostCode = page.locator('.saved-address-postcode');
        this.savedAddressCity = page.locator('.saved-address-city');
        this.savedAddressCountry = page.locator('.saved-address-country');
        this.continueToPaymentButton = page.locator('.continue-to-payment-button');
    }

    fillDetails = async (userAddress) => {
        await this.firstNameField.waitFor();
        await this.firstNameField.fill(userAddress.firstName);
        await this.lastNameField.fill(userAddress.lastName);
        await this.streetField.fill(userAddress.street);
        await this.postCodeField.fill(userAddress.postCode);
        await this.cityField.fill(userAddress.city);
        await this.countryDropdown.selectOption(userAddress.country);
    }

    saveAddress = async () => {
        const addressesAmount = await this.savedAddressBlock.count();
        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();
        console.log(addressesAmount);
        await this.savedAddressBlock.waitFor()
        await expect(this.savedAddressBlock).toHaveCount(addressesAmount + 1);
        async function checkDetails (savedInfo, field) {
            await savedInfo.first().waitFor();
            expect(await savedInfo.first().innerText()).toBe(await field.inputValue());
        }
        await checkDetails(this.savedAddressFirstName, this.firstNameField);
        await checkDetails(this.savedAddresslastName, this.lastNameField);
        await checkDetails(this.savedAddressStreet, this.streetField);
        await checkDetails(this.savedAddressPostCode, this.postCodeField);
        await checkDetails(this.savedAddressCity, this.cityField);
        await checkDetails(this.savedAddressCountry, this.countryDropdown);
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor();
        await this.continueToPaymentButton.click();
        await this.page.waitForURL(/\/payment/);
    }
}