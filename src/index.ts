import './assets/scss/app.scss';

import { LoginPageContainer } from './modules/login';
import { RegisterPageContainer } from './modules/register';
import { ChatPageContainer } from './modules/chat';
import { ProfilePageContainer } from './modules/profile';
import { ProfileEditPageContainer } from './modules/profile-edit';
import { ChangePasswordPageContainer } from './modules/change-password';
import { Error404PageContainer } from './modules/404';
import { Error500PageContainer } from './modules/500';
import { validationResults } from './modules/validation';

const loginPage = new LoginPageContainer({}),
    registerPage = new RegisterPageContainer({}),
    chatPage = new ChatPageContainer({}),
    profilePage = new ProfilePageContainer({}),
    profileEditPage = new ProfileEditPageContainer({}),
    changePasswordPage = new ChangePasswordPageContainer({}),
    error404Page = new Error404PageContainer({}),
    error500Page = new Error500PageContainer({});

const pages = {
    'login': loginPage,
    'register': registerPage,
    'chat': chatPage,
    'profile': profilePage,
    'profile-edit': profileEditPage,
    'change-password': changePasswordPage,
    '404': error404Page,
    '500': error500Page,
}

export function navigate(page: string) {
    const block = pages[page as keyof typeof pages];
    container.replaceChildren(block.getContent()!);
}

document.addEventListener('click', evt => {
    const page = (evt.target as HTMLAreaElement).getAttribute('page');
    if (page) {
        navigate(page);
        clearFields();

        evt.preventDefault();
        evt.stopImmediatePropagation();
    }
});

const block = new LoginPageContainer({});
const container = document.getElementById('app')!;
container.append(block.getContent()!);

function clearFields() {
    Object.keys(validationResults).forEach(key => delete validationResults[key]);
}
