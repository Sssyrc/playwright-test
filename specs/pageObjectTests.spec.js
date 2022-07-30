import chai from "chai";
import app from "../pages/index";
import {run, stop} from '../lib/browse';

const assert = chai.assert;

describe ('pageObject', () => {
    let page;

    beforeEach( async() => {
        page = await run('https://demo.payloadcms.com/admin/login');
    });

    afterEach ( async() => {
        await stop();
    });

    it('Авторизация на сайте', async () => {
        await app().auth().login(page, 'demo@payloadcms.com', 'demo');
        const HeaderText = await app().main().getProfileName(page);
        assert.strictEqual(HeaderText, 'Collections', 'Вход не выполнен');
    });

   it('Logout', async () => {
        await app().auth().login(page, 'demo@payloadcms.com', 'demo');
        await app().main().logout(page);
        const logouttext = await app().main().logoutText(page);
        assert.strictEqual(logouttext, 'You have been logged out successfully.', 'error');
    });
    
});
