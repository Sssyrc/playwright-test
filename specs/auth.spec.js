import chai from "chai";
import {run, stop} from '../lib/browse';
const assert = chai.assert;

describe ('Пробуем playwright', () => {
    let page;
    const usernameField = '#user-name';
    const passwordField = '#password';
    const loginBtn = '.btn_action';
    const MainPageField = '#page_wrapper > #contents_wrapper > #header_container > .header_secondary_container > .title';
    const AddBackpackToCartBtn = '#add-to-cart-sauce-labs-backpack';
    const ShoppingCartBtn = '#contents_wrapper > #header_container > .primary_header > #shopping_cart_container > .shopping_cart_link';
    const BackpackName = '.cart_list > .cart_item > .cart_item_label > #item_4_title_link > .inventory_item_name';
    const RemovedItem = '.cart_list > #removed_cart_item';
    const CheckoutBtn = '#checkout';
    const firstNameField = '#first-name';
    const lastNameField = '#last-name';
    const ZipCodeField = '#postal-code';
    const continueBtn = '#continue';
    const finishBtn = '#finish';
    const OrderThxText = '#root > #page_wrapper > #contents_wrapper > #checkout_complete_container > .complete-header';
    const sidebarBtn = '#react-burger-menu-btn';
    const logoutBtn = '#logout_sidebar_link';
    const sidebarField = '#menu_button_container > div > .bm-menu-wrap > .bm-menu > .bm-item-list';
    const logCred = '#root > div > .login_wrapper > .login_credentials_wrap > .login_credentials_wrap-inner';

    beforeEach( async() => {
        page = await run('https://www.saucedemo.com/');
    });

    afterEach ( async() => {
        await stop();
    });

    it('Авторизация на сайте', async () => {
        await page.click(usernameField);
        await page.fill(usernameField, 'standard_user');
        await page.click(passwordField);
        await page.fill(passwordField, 'secret_sauce');
        await page.click(loginBtn);
        await page.waitForSelector(MainPageField);
        const MainPageTitle = await page.textContent(MainPageField);
        assert.strictEqual(MainPageTitle, 'Products', 'Вход не выполнен');
    });

    it('Добавление заказа в корзину', async () => {
        await page.click(usernameField);
        await page.fill(usernameField, 'standard_user');
        await page.click(passwordField);
        await page.fill(passwordField, 'secret_sauce');
        await page.click(loginBtn);
        await page.waitForSelector(MainPageField);
        await page.click(AddBackpackToCartBtn);
        await page.click(ShoppingCartBtn);
        await page.waitForSelector(BackpackName);
        const CartField = await page.textContent(BackpackName);
        assert.strictEqual(CartField, 'Sauce Labs Backpack', 'Корзина пуста');
    });

    it('Оформление заказа', async () => {
        await page.click(usernameField);
        await page.fill(usernameField, 'standard_user');
        await page.click(passwordField);
        await page.fill(passwordField, 'secret_sauce');
        await page.click(loginBtn);
        await page.waitForSelector(MainPageField);
        await page.click(AddBackpackToCartBtn);
        await page.click(ShoppingCartBtn);
        await page.click(CheckoutBtn);
        await page.click(firstNameField);
        await page.fill(firstNameField, 'aaa');
        await page.click(lastNameField);
        await page.fill(lastNameField, 'bb');
        await page.click(ZipCodeField);
        await page.fill(ZipCodeField, '123');
        await page.click(continueBtn);
        await page.waitForSelector(BackpackName);
        await page.click(finishBtn);
        await page.waitForSelector(OrderThxText);
        const ThxForOrderField = await page.textContent(OrderThxText);
        assert.strictEqual(ThxForOrderField, 'THANK YOU FOR YOUR ORDER', 'заказ не прошел');
    });

    it('Выход из аккаунта', async () => {
        await page.click(usernameField);
        await page.fill(usernameField, 'standard_user');
        await page.click(passwordField);
        await page.fill(passwordField, 'secret_sauce');
        await page.click(loginBtn);
        await page.waitForSelector(MainPageField);
        await page.click(sidebarBtn);
        await page.waitForSelector(sidebarField);
        await page.click(logoutBtn);
        const logUsernames = await page.textContent(logCred);
        assert.deepStrictEqual(logUsernames, 'Accepted usernames are:standard_userlocked_out_userproblem_userperformance_glitch_userPassword for all users:secret_sauce', 'sdasd');
    });

});
