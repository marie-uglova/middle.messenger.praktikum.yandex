import './assets/scss/app.scss';

import * as Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import { LoginPageContainer } from './modules/login';
import { RegisterPageContainer } from './modules/register';
import { ChatPageContainer } from './modules/chat';
import { ProfilePageContainer } from './modules/profile';
import { ProfileEditPageContainer } from './modules/profile-edit';
import { ChangePasswordPageContainer } from './modules/change-password';
import { Error404PageContainer } from './modules/404';
import { Error500PageContainer } from './modules/500';

const pages = {
    'login': [ Pages.LoginPage ],
    'register': [ Pages.RegisterPage ],
    'chat': [ Pages.ChatPage ],
    'profile': [ Pages.ProfilePage ],
    'profile-edit': [ Pages.ProfileEditPage ],
    'change-password': [ Pages.ChangePasswordPage ],
    '404': [ Pages.Error404Page ],
    '500': [ Pages.Error500Page ],
};

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

function navigate(page) {
    const app = document.getElementById('app');
    const [ source, args ] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);
    app.innerHTML = handlebarsFunct(args);
}

//document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', e => {
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});

const block = new LoginPageContainer({});
const container = document.getElementById('app')!;
container.append(block.getContent()!);
