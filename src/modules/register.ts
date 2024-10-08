import Block from '../core/block';
import { validationResults, validate, validateForm, checkLogin, checkName, checkPassword, checkEmail, checkPhone } from './validation';
import { Input } from '../components/uikit/input';
import { Field } from '../components/uikit/field';
import { Button } from '../components/uikit/button';
import { Link } from '../components/uikit/link';
import { RegisterForm } from '../components/login/register-form';
import { RegisterWindow } from '../components/login/register-window';
import { RegisterPage } from '../pages/register-page';
import AuthController from '../controllers/auth-controller';

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
class RegisterFormComponent extends Block {
    render() {
        return RegisterForm;
    }
}

class RegisterWindowComponent extends Block {
    render() {
        return RegisterWindow;
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
        events: {
            blur: (evt: Event) => {
                validate(evt, checkEmail, 'email');
            }
        }
    })
})

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

const fieldName = new FieldComponent({
    for: 'first_name',
    label: 'Имя',
    input: new InputComponent({
        name: 'first_name',
        id: 'first_name',
        type: 'text',
        events: {
            blur: (evt: Event) => {
                validate(evt, checkName, 'first_name');
            }
        }
    })
})

const fieldSecondName = new FieldComponent({
    for: 'second_name',
    label: 'Фамилия',
    input: new InputComponent({
        name: 'second_name',
        id: 'second_name',
        type: 'text',
        events: {
            blur: (evt: Event) => {
                validate(evt, checkName, 'second_name');
            }
        }
    })
})

const fieldPhone = new FieldComponent({
    for: 'phone',
    label: 'Телефон',
    input: new InputComponent({
        name: 'phone',
        id: 'phone',
        type: 'tel',
        events: {
            blur: (evt: Event) => {
                validate(evt, checkPhone, 'phone');
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

const fieldPasswordRepeat = new FieldComponent({
    for: 'passwordRepeat',
    label: 'Пароль еще раз',
    input: new InputComponent({
        name: 'passwordRepeat',
        id: 'passwordRepeat',
        type: 'password',
        events: {
            blur: (evt: Event) => {
                validate(evt, checkPassword, 'passwordRepeat');
            }
        }
    }),
})

const buttonRegister = new ButtonComponent({
    text: 'Зарегистрироваться',
    type: 'submit',
})

const linkLogin = new LinkComponent({
    text: 'Войти',
    url: '/',
})

const registerForm = new RegisterFormComponent({
    formContent: [fieldEmail, fieldLogin, fieldName, fieldSecondName, fieldPhone, fieldPassword, fieldPasswordRepeat, buttonRegister],
    events: {
        submit: (evt: Event) => {
            checkForm(evt);
        }
    }
})

const registerContent = new RegisterWindowComponent({
    registerForm: registerForm,
    registerFooter: linkLogin
})

export class RegisterPageContainer extends Block {
    constructor(props: {[key: string]: string}) {
        super({
            ...props,
            registerPageContent: new RegisterPageComponent({
                pageContent: registerContent
            }),
        })
    }

    override render() {
        return `<main class="main">{{{ registerPageContent }}}</main>`
    }
}

function checkForm(evt: Event) {
    evt.preventDefault();

    const registerValidationResults: Record<string, boolean | null> = {
        'email': validationResults.email,
        'login': validationResults.login,
        'first_name': validationResults.first_name,
        'second_name': validationResults.second_name,
        'phone': validationResults.phone,
        'password': validationResults.password,
        'passwordRepeat': validationResults.passwordRepeat
    }

    if(validationResults.login &&
        validationResults.password &&
        validationResults.passwordRepeat &&
        validationResults.email &&
        validationResults.phone &&
        validationResults.first_name &&
        validationResults.second_name) {
        singUp(evt);
    } else {
        validateForm(evt, registerValidationResults);
    }
}

function singUp(evt: Event) {
    const form = (evt.target as HTMLFormElement),
        firstName = document.querySelector(`[name="first_name"]`),
        firstNameValue = (firstName as HTMLInputElement).value,
        secondName = document.querySelector(`[name="second_name"]`),
        secondNameValue = (secondName as HTMLInputElement).value,
        login = form.querySelector(`[name="login"]`),
        loginValue = (login as HTMLInputElement).value,
        email = form.querySelector(`[name="email"]`),
        emailValue = (email as HTMLInputElement).value,
        password = form.querySelector(`[name="password"]`),
        passwordValue = (password as HTMLInputElement).value,
        phone = form.querySelector(`[name="phone"]`),
        phoneValue = (phone as HTMLInputElement).value;

    const data = {
        first_name: firstNameValue,
        second_name: secondNameValue,
        login: loginValue,
        email: emailValue,
        password: passwordValue,
        phone: phoneValue,
    };

    AuthController.signup(JSON.stringify(data));
}
