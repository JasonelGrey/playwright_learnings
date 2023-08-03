import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";
import { Checkout } from "../page-objects/Checkout";
import { LoginPage } from "../page-objects/LoginPage";
import { RegisterPage } from "../page-objects/RegisterPage";
import { v4 as uuidv4 } from 'uuid';
import { DeliveryDetails } from "../page-objects/Deliverydetails";
import { userAddress } from "../data/userAddress";
import { PaymentPage } from "../page-objects/PaymentPage";
import { PaymentDetails } from "../data/PaymentDetails";


test("End_to_end-test", async ({ page }) => {
    const producstPage = new ProductsPage(page);
    await producstPage.visit();
    await producstPage.sortByCheapest();
    await producstPage.addProductToTheBasket(0);
    await producstPage.addProductToTheBasket(1);
    await producstPage.addProductToTheBasket(2);

    const navigation  = new Navigation(page);
    await navigation.goToCheckout();

    const checkout = new Checkout (page);
    await checkout.removeCheapestProduct();
    await checkout.continueToCheckout();

    const loginPage = new LoginPage(page);
    await loginPage.moveToSignUp();

    const registerPage = new RegisterPage(page);
    const email = uuidv4() + "test.com"
    const password = uuidv4();
    await registerPage.singUpAsNewUser(email, password);

    const deliveryDetails = new DeliveryDetails(page);
    await deliveryDetails.fillDetails(userAddress);
    await deliveryDetails.saveAddress();
    await deliveryDetails.continueToPayment();

    const paymentPage = new PaymentPage(page);
    await paymentPage.activateDiscount();
    await paymentPage.fillPaymentDetails(PaymentDetails);
    await paymentPage.completePayment();

    await page.pause();
})