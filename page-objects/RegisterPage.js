import { expect } from "@playwright/test"
import { v4 as uuidv4 } from 'uuid';


export class RegisterPage {
    constructor (page) {
        this.page = page;
        this.emailField = page.getByPlaceholder('E-Mail');
        this.passwordField = page.getByPlaceholder('password');
        this.registerButton = page.locator('form > div > button');

    }

    singUpAsNewUser = async (email,password) => {
        await this.emailField.waitFor();
        //const emailId = uuidv4();
        //const email = emailId + "@test.com"
        await this.emailField.fill(email);
        //const password = uuidv4();
        await this.passwordField.fill(password);
        await this.registerButton.click();
    }

    hello = async() => {}

}