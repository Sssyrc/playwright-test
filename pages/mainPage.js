const MainPageField = '.template-default > .template-default__wrap > .dashboard > .gutter--left > .dashboard__label:nth-child(2)';
const LogoutBtn = '.nav__scroll > .nav__wrap > .nav__controls > .nav__log-out > .icon';
const LogoutMessage = '#app > .logout > .template-minimal__wrap > .logout__wrap > h2';

const mainPage = {
    getProfileName: async (page) => {
        const ProfileNameText = await page.textContent(MainPageField);
        return ProfileNameText;
    },

    logout: async(page) => {
        await page.click(LogoutBtn);
    },

    logoutText: async (page) => {
        const categoryName = await page.textContent(LogoutMessage);
        return categoryName;
    },
}

export default mainPage;
