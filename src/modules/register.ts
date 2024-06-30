import Block from './block';
import { Alert } from '../components/uikit/alert';
import { Input } from '../components/uikit/input';
import { Field } from '../components/uikit/field';
import { Button } from '../components/uikit/button';
import { Link } from '../components/uikit/link';
import { RegisterForm } from '../components/login/register-form';
import { RegisterPage } from '../pages/register-page';

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
class RegisterFormComponent extends Block {
    render() {
        return RegisterForm;
    }
}

class RegisterPageComponent extends Block {
    render() {
        return RegisterPage;
    }
}

const fieldEmail = new FieldComponent({
    for: 'email',
    label: 'Почта',
    input: new InputComponent({
        name: 'email',
        id: 'email',
        type: 'email',
    })
})

const fieldLogin = new FieldComponent({
    for: 'login',
    label: 'Логин',
    input: new InputComponent({
        name: 'login',
        id: 'login',
        type: 'text',
    })
})

const fieldName = new FieldComponent({
    for: 'first_name',
    label: 'Имя',
    input: new InputComponent({
        name: 'first_name',
        id: 'first_name',
        type: 'text',
    })
})

const fieldSecondName = new FieldComponent({
    for: 'second_name',
    label: 'Фамилия',
    input: new InputComponent({
        name: 'second_name',
        id: 'second_name',
        type: 'text',
    })
})

const fieldPhone = new FieldComponent({
    for: 'phone',
    label: 'Телефон',
    input: new InputComponent({
        name: 'phone',
        id: 'phone',
        type: 'tel',
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

const fieldPasswordRepeat = new FieldComponent({
    for: 'password',
    label: 'Пароль еще раз',
    input: new InputComponent({
        name: 'password',
        id: 'password',
        type: 'password'
    }),
})

const buttonRegister = new ButtonComponent({
    text: 'Зарегистрироваться',
    page: 'chat'
})

const linkLogin = new LinkComponent({
    text: 'Войти',
    page: 'login'
})

const registerContent = new RegisterFormComponent({
    formContent: [fieldEmail, fieldLogin, fieldName, fieldSecondName, fieldPhone, fieldPassword, fieldPasswordRepeat, buttonRegister],
    registerFooter: linkLogin
})

export class RegisterPageContainer extends Block {
    constructor(props) {
        super({
            ...props,
            registerPageContent: new RegisterPageComponent({
                pageContent: registerContent
            }),
        })
    }

    override render() {
        return `{{{ registerPageContent }}}`
    }
}
