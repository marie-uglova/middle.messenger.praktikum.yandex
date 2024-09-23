import './assets/scss/app.scss';
import Router from './core/router';
import User from './core/get-user';
import { connect } from './core/hoc';
import { LoginPageContainer } from './modules/login';
import { RegisterPageContainer } from './modules/register';
import { ChatPageContainer } from './modules/chat';
import { ProfilePageContainer } from './modules/profile';
import { ProfileEditPageContainer } from './modules/profile-edit';
import { ChangePasswordPageContainer } from './modules/change-password';
import { Error404PageContainer } from './modules/404';
import { Error500PageContainer } from './modules/500';

const loginPage = connect(LoginPageContainer, stateToPropsSelector),
    registerPage = connect(RegisterPageContainer),
    chatPage = connect(ChatPageContainer, stateToPropsSelector),
    profilePage = connect(ProfilePageContainer, stateToPropsSelector),
    profileEditPage = connect(ProfileEditPageContainer, stateToPropsSelector),
    changePasswordPage = connect(ChangePasswordPageContainer, stateToPropsSelector),
    error404Page = connect(Error404PageContainer),
    error500Page = connect(Error500PageContainer);

const router = new Router('app');
const user = new User();

user.getUserStore();

router
    .use("/", loginPage)
    .use("/sign-up", registerPage)
    .use("/messenger", chatPage)
    .use("/profile", profilePage)
    .use("/settings", profileEditPage)
    .use("/change-password", changePasswordPage)
    .use("/404", error404Page)
    .use("/500", error500Page)
    .start()

function stateToPropsSelector(state: any) {
    return {
        first_name: state?.user?.first_name,
        second_name: state?.user?.second_name,
        login: state?.user?.login,
        display_name: state?.user?.display_name,
        email: state?.user?.email,
        phone: state?.user?.phone,
        avatar: state?.user?.avatar,
        id: state?.user?.id,
    }
}
