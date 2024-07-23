import './assets/scss/app.scss';
import Router from './modules/router';
import { connect } from './modules/hoc';
import { LoginPageContainer } from './modules/login';
import { RegisterPageContainer } from './modules/register';
import { ChatPageContainer } from './modules/chat';
import { ProfilePageContainer } from './modules/profile';
import { ProfileEditPageContainer } from './modules/profile-edit';
import { ChangePasswordPageContainer } from './modules/change-password';
import { Error404PageContainer } from './modules/404';
import { Error500PageContainer } from './modules/500';

const loginPage = connect(LoginPageContainer),
    registerPage = connect(RegisterPageContainer),
    chatPage = connect(ChatPageContainer),
    profilePage = connect(ProfilePageContainer),
    profileEditPage = connect(ProfileEditPageContainer),
    changePasswordPage = connect(ChangePasswordPageContainer),
    error404Page = connect(Error404PageContainer),
    error500Page = connect(Error500PageContainer);

const router = new Router('app');

router
    .use("/", loginPage)
    .use("/register", registerPage)
    .use("/chat", chatPage)
    .use("/profile", profilePage)
    .use("/profile-edit", profileEditPage)
    .use("/change-password", changePasswordPage)
    .use("/404", error404Page)
    .use("/500", error500Page)
    .start()
