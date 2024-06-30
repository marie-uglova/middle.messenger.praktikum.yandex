import Block from './block';
import { Alert } from '../components/uikit/alert';
import { Input } from '../components/uikit/input';
import { Field } from '../components/uikit/field';
import { Button } from '../components/uikit/button';
import { Link } from '../components/uikit/link';
import { LoginForm } from '../components/login/login-form';
import { LoginPage } from '../pages/login-page';

class InputComponent extends Block {
    render() {
        return Input;
    }
}

class AlertComponent extends Block {
    render() {
        return Alert;
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
    }),
    alert: new AlertComponent({
        alert: 'Неверный логин',
        classNameAlert: '_error',
    })
})

const fieldPassword = new FieldComponent({
    for: 'password',
    label: 'Пароль',
    input: new InputComponent({
        name: 'password',
        id: 'password',
        type: 'password'
    }),
})

const buttonEnter = new ButtonComponent({
    text: 'Войти',
    page: 'chat'
})

const linkRegister = new LinkComponent({
    text: 'Зарегистрироваться',
    page: 'register'
})

const loginContent = new LoginFormComponent({
    formContent: [fieldLogin, fieldPassword, buttonEnter],
    loginFooter: linkRegister
})

export class LoginPageContainer extends Block {
    constructor(props) {
        super({
            ...props,
            loginPageContent: new LoginPageComponent({
                pageContent: loginContent
            }),
        })
    }

    /*componentDidUpdate(oldProps, newProps) {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.children.button.setProps({ text: newProps.buttonText });
        }
        return true;
    }*/

    override render() {
        return `{{{ loginPageContent }}}`
    }
}
