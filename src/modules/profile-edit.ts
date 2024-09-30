import Block from '../core/block';
import { validationResults, validate, validateForm, checkLogin, checkName, checkEmail, checkPhone } from './validation';
import { Input } from '../components/uikit/input';
import { Field } from '../components/uikit/field';
import { Button } from '../components/uikit/button';
import { ProfileHeader } from '../components/profile/profile-header';
import { ProfileForm } from '../components/profile/profile-form';
import { ProfileAvatarForm } from '../components/profile/profile-avatar-form';
import { ProfileEditPage } from '../pages/profile-edit-page';
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

class ProfileAvatarFormComponent extends Block {
    render() {
        return ProfileAvatarForm;
    }
}

class ProfileEditPageComponent extends Block {
    render() {
        return ProfileEditPage;
    }
}

const profileHeader = new ProfileHeaderComponent({
    userFirstName: ''
});

const fieldAvatar = new FieldComponent({
    for: 'avatar',
    label: 'Изменить аватар',
    input: new InputComponent({
        name: 'avatar',
        id: 'avatar',
        type: 'file',
        accept: 'image/*'
    })
})

const inputName = new InputComponent({
    name: 'first_name',
    id: 'first_name',
    type: 'text',
    value: '',
    events: {
        blur: (evt: Event) => {
            validate(evt, checkName, 'first_name');
        }
    }
})

const fieldName = new FieldComponent({
    for: 'first_name',
    label: 'Имя',
    input: inputName
})

const inputSecondName = new InputComponent({
    name: 'second_name',
    id: 'second_name',
    type: 'text',
    value: '',
    events: {
        blur: (evt: Event) => {
            validate(evt, checkName, 'second_name');
        }
    }
})

const fieldSecondName = new FieldComponent({
    for: 'second_name',
    label: 'Фамилия',
    input: inputSecondName
})

const inputDisplayName = new InputComponent({
    name: 'display_name',
    id: 'display_name',
    type: 'text',
    value: '',
})

const fieldChatName = new FieldComponent({
    for: 'display_name',
    label: 'Имя в чате',
    input: inputDisplayName
})

const inputLogin = new InputComponent({
    name: 'login',
    id: 'login',
    type: 'text',
    value: '',
    events: {
        blur: (evt: Event) => {
            validate(evt, checkLogin, 'login');
        }
    }
})

const fieldLogin = new FieldComponent({
    for: 'login',
    label: 'Логин',
    input: inputLogin,
})

const inputEmail = new InputComponent({
    name: 'email',
    id: 'email',
    type: 'email',
    value: '',
    events: {
        blur: (evt: Event) => {
            validate(evt, checkEmail, 'email');
        }
    }
})

const fieldEmail = new FieldComponent({
    for: 'email',
    label: 'Почта',
    input: inputEmail
})

const inputPhone = new InputComponent({
    name: 'phone',
    id: 'phone',
    type: 'tel',
    value: '',
    events: {
        blur: (evt: Event) => {
            validate(evt, checkPhone, 'phone');
        }
    }
})

const fieldPhone = new FieldComponent({
    for: 'phone',
    label: 'Телефон',
    input: inputPhone
})

const buttonSave = new ButtonComponent({
    text: 'Сохранить',
    type: 'submit'
})

const profileAvatarForm = new ProfileAvatarFormComponent({
    profileAvatar: fieldAvatar,
    events: {
        submit: (evt: Event) => {
            changeAvatar(evt);
        }
    }
})

const profileForm = new ProfileFormComponent({
    profileEditForm: [fieldName, fieldSecondName, fieldChatName, fieldLogin, fieldEmail, fieldPhone],
    profileEditButton: buttonSave,
    events: {
        submit: (evt: Event) => {
            checkForm(evt);
        }
    }
})

export class ProfileEditPageContainer extends Block {
    constructor(props: {[key: string]: string}) {
        super({
            ...props,
            profileEditPageContent: new ProfileEditPageComponent({
                profileHeader: profileHeader,
                profileAvatarForm: profileAvatarForm,
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
            inputName.setProps({value: newProps.props.first_name});
            inputSecondName.setProps({value: newProps.props.second_name});
            inputDisplayName.setProps({value: newProps.props.display_name});
            inputLogin.setProps({value: newProps.props.login});
            inputEmail.setProps({value: newProps.props.email});
            inputPhone.setProps({value: newProps.props.phone});
            return true;
        }
        return false;
    }

    override render() {
        return `<main class="main">{{{ profileEditPageContent }}}</main>`
    }
}

function checkForm(evt: Event) {
    evt.preventDefault();

    const profileValidationResults: Record<string, boolean | null> = {
        'email': validationResults.email,
        'login': validationResults.login,
        'first_name': validationResults.first_name,
        'second_name': validationResults.second_name,
        'phone': validationResults.phone
    }

    if(validationResults.login &&
        validationResults.email &&
        validationResults.phone &&
        validationResults.first_name &&
        validationResults.second_name) {
        changeProfile(evt);
    } else {
        validateForm(evt, profileValidationResults);
    }
}

function changeProfile(evt: Event) {
    const form = (evt.target as HTMLFormElement),
        firstName = form.querySelector(`[name="first_name"]`),
        firstNameValue = (firstName as HTMLInputElement).value,
        secondName = form.querySelector(`[name="second_name"]`),
        secondNameValue = (secondName as HTMLInputElement).value,
        displayName = form.querySelector(`[name="display_name"]`),
        displayNameValue = (displayName as HTMLInputElement).value,
        login = form.querySelector(`[name="login"]`),
        loginValue = (login as HTMLInputElement).value,
        email = form.querySelector(`[name="email"]`),
        emailValue = (email as HTMLInputElement).value,
        phone = form.querySelector(`[name="phone"]`),
        phoneValue = (phone as HTMLInputElement).value;

    const data = {
        first_name: firstNameValue,
        second_name: secondNameValue,
        display_name: displayNameValue,
        login: loginValue,
        email: emailValue,
        phone: phoneValue,
    };

    ProfileController.changeProfile(JSON.stringify(data));
}

function changeAvatar(evt: Event) {
    evt.preventDefault();

    const form = (evt.target as HTMLFormElement),
        formData = new FormData(form),
        avatar = form.querySelector(`[name="avatar"]`),
        avatarValue = (avatar as HTMLInputElement).value;

    formData.append('avatar', avatarValue);

    ProfileController.changeAvatar(formData);
}
