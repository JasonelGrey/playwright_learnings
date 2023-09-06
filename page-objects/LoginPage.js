import { expect } from "@playwright/test"

export class LoginPage {
    constructor (page) {
        this.page = page;
        this.registerButton = page.locator('[data-qa="go-to-signup-button"]');  

    }

    moveToSignUp = async () => {
        await this.registerButton.waitFor();
        await this.registerButton.click();
        await this.page.waitForURL(/\/signup/);
        console.log("hello");
        console.log("hello");
        console.log("hello");
        console.log("hello");
    }


}