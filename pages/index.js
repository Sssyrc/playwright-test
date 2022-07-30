import loginPage from './loginPage';
import mainPage from './mainPage';

const app = () => ({
    auth: () => ({...loginPage}),
    main: () => ({...mainPage}),
});

export default app;