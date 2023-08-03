export class MyAccountPage {
    constructor (page) {
        this.page = page;
        this.myAccountPageHeading = page.locator('#__next > div > div.flex.justify-center > div > h1');
        this.errorMessage = page.locator('[data-qa="error-message"]');
    }

    visit = async () => {
        await this.page.goto('/my-account');
        
        
    }
    waitForPageHeading = async () => {
        await this.myAccountPageHeading.waitFor();
    }

    waitForErrorMessage = async() => {
        await this.errorMessage.waitFor();
    }
}