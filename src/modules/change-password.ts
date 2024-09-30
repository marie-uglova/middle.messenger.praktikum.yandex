import Block from '../core/block';
import { validationResults, validate, validateForm, checkPassword } from './validation';
import { Input } from '../components/uikit/input';
import { Field } from '../components/uikit/field';
import { Button } from '../components/uikit/button';
import { ProfileHeader } from '../components/profile/profile-header';
import { ProfileForm } from '../components/profile/profile-form';
import { ChangePasswordPage } from '../pages/change-password-page';
import User from '../core/get-user';
import ProfileController from '../controllers/profile-controller';

const user = new User();

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

class ProfileHeaderComponent extends Block {
    render() {
        return ProfileHeader;
    }
}

class ProfileFormComponent extends Block {
    render() {
        return ProfileForm;
    }
}

class ChangePasswordPageComponent extends Block {
    render() {
        return ChangePasswordPage;
    }
}

const profileHeader = new ProfileHeaderComponent({
    userFirstName: ''
});

const fieldOldPassword = new FieldComponent({
    for: 'password_old',
    label: 'Старый пароль',
    input: new InputComponent({
        name: 'password_old',
        id: 'password_old',
        type: 'password',
        events: {
            blur: (evt: Event) => {
                validate(evt, checkPassword, 'password_old');
            }
        }
    })
})

const fieldNewPassword = new FieldComponent({
    for: 'password',
    label: 'Новый пароль',
    input: new InputComponent({
        name: 'password',
        id: 'password',
        type: 'password',
        events: {
            blur: (evt: Event) => {
                validate(evt, checkPassword, 'password');
            }
        }
    })
})

const fieldNewPasswordRepeat = new FieldComponent({
    for: 'password_repeat',
    label: 'Повторите новый пароль',
    input: new InputComponent({
        name: 'password_repeat',
        id: 'password_repeat',
        type: 'password',
        events: {
            blur: (evt: Event) => {
                validate(evt, checkPassword, 'password_repeat');
            }
        }
    })
})

const buttonSave = new ButtonComponent({
    text: 'Сохранить',
    type: 'submit'
})

const profileForm = new ProfileFormComponent({
    profileEditForm: [fieldOldPassword, fieldNewPassword, fieldNewPasswordRepeat],
    profileEditButton: buttonSave,
    events: {
        submit: (evt: Event) => {
            checkForm(evt);
        }
    }
})

export class ChangePasswordPageContainer extends Block {
    constructor(props: {[key: string]: string}) {
        super({
            ...props,
            changePasswordPageContent: new ChangePasswordPageComponent({
                profileHeader: profileHeader,
                profileForm: profileForm,
            }),
        })

        user.getUserStore();
    }

    override componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps.props?.first_name !== newProps.props?.first_name) {
            profileHeader.setProps({
                userFirstName: newProps.props.first_name,
                userAvatar: (() => {
                    if (newProps.props.avatar) {
                        return `<img loading="lazy" src="https://ya-praktikum.tech/api/v2/resources${newProps.props.avatar}" alt="аватар юзера" />`;
                    } else {
                        return `<img loading="lazy" src="../assets/images/ava.png" alt="аватар юзера" />`;
                    }
                })()
            });
            return true;
        }
        return false;
    }

    override render() {
        return `<main class="main">{{{ changePasswordPageContent }}}</main>`
    }
}

function checkForm(evt: Event) {
    evt.preventDefault();

    const passwordValidationResults: Record<string, boolean | null> = {
        'password': validationResults.password,
        'password_repeat': validationResults.password_repeat,
        'password_old': validationResults.password_old
    }

    if(validationResults.password &&
        validationResults.password_repeat &&
        validationResults.password_old) {
        changePassword(evt);
    } else {
        validateForm(evt, passwordValidationResults);
    }
}

function changePassword(evt: Event) {
    const form = (evt.target as HTMLFormElement),
        oldPassword = form.querySelector(`[name="password_old"]`),
        oldPasswordValue = (oldPassword as HTMLInputElement).value,
        newPassword = form.querySelector(`[name="password"]`),
        newPasswordValue = (newPassword as HTMLInputElement).value;

    const data = {
        oldPassword: oldPasswordValue,
        newPassword: newPasswordValue,
    };

    ProfileController.changePassword(JSON.stringify(data));
}
