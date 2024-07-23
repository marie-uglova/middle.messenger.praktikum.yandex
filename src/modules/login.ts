import Block from './block';
import { validationResults, validate, validateForm, checkLogin, checkPassword } from './validation';
import { Input } from '../components/uikit/input';
import { Field } from '../components/uikit/field';
import { Button } from '../components/uikit/button';
import { Link } from '../components/uikit/link';
import { LoginForm } from '../components/login/login-form';
import { LoginWindow } from '../components/login/login-window';
import { LoginPage } from '../pages/login-page';

class InputComponent extends Block {
    render() {
        return Input;
    }
}

class FieldComponent extends Block {
    render() {
        return Field;
    }
}

class ButtonComponent extends Block {
    render() {
        return Button;
    }
}

class LinkComponent extends Block {
    render() {
        return Link;
    }
}

class LoginFormComponent extends Block {
    render() {
        return LoginForm;
    }
}

class LoginWindowComponent extends Block {
    render() {
        return LoginWindow;
    }
}

class LoginPageComponent extends Block {
    render() {
        return LoginPage;
    }
}

const fieldLogin = new FieldComponent({
    for: 'login',
    label: 'Логин',
    input: new InputComponent({
        name: 'login',
        id: 'login',
        type: 'text',
        events: {
            blur: (evt: Event) => {
                validate(evt, checkLogin, 'login');
            }
        }
    })
})

const fieldPassword = new FieldComponent({
    for: 'password',
    label: 'Пароль',
    input: new InputComponent({
        name: 'password',
        id: 'password',
        type: 'password',
        events: {
            blur: (evt: Event) => {
                validate(evt, checkPassword, 'password');
            }
        }
    }),
})

const buttonEnter = new ButtonComponent({
    text: 'Войти',
    type: 'submit',
})

const linkRegister = new LinkComponent({
    text: 'Зарегистрироваться',
    url: '/register',
})

const loginForm = new LoginFormComponent({
    formContent: [fieldLogin, fieldPassword, buttonEnter],
    events: {
        submit: (evt: Event) => {
            checkForm(evt);
        }
    }
})

const loginContent = new LoginWindowComponent({
    loginForm: loginForm,
    loginFooter: linkRegister
})

export class LoginPageContainer extends Block {
    constructor(props: {[key: string]: string}) {
        super({
            ...props,
            loginPageContent: new LoginPageComponent({
                pageContent: loginContent
            }),
        })
    }

    override render() {
        return `{{{ loginPageContent }}}`
    }
}

function checkForm(evt: Event) {
    evt.preventDefault();

    const loginValidationResults: Record<string, boolean | null> = {
        'login': validationResults.login,
        'password': validationResults.password,
    }

    if(validationResults.login &&
        validationResults.password) {
        login(fieldLogin, fieldPassword);
    } else {
        validateForm(evt, loginValidationResults);
    }
}

function login(login, password) {
    console.log(login, password);
}
