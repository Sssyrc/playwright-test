const emailField = '#field-email';
const passwordField = '#field-password';
const loginBtn = '.login > .template-minimal__wrap > .form > .form-submit > .btn'; 

const loginPage = {
    login: async (page, email, password) => {
        await page.click(emailField);
        await page.fill(emailField, email);
        await page.click(passwordField);
        await page.fill(passwordField, password);
        await page.click(loginBtn);
    }
}

export default loginPage;