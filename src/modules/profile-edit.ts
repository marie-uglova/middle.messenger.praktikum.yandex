import Block from './block';
import { validationResults, validate, validateForm, checkLogin, checkName, checkEmail, checkPhone } from './validation';
import { Input } from '../components/uikit/input';
import { Field } from '../components/uikit/field';
import { Button } from '../components/uikit/button';
import { ProfileHeader } from '../components/profile/profile-header';
import { ProfileForm } from '../components/profile/profile-form';
import { ProfileEditPage } from '../pages/profile-edit-page';

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

class ProfileEditPageComponent extends Block {
    render() {
        return ProfileEditPage;
    }
}

const profileHeader = new ProfileHeaderComponent({

});

const fieldAvatar = new FieldComponent({
    for: 'avatar',
    label: 'Изменить аватар',
    input: new InputComponent({
        name: 'avatar',
        id: 'avatar',
        type: 'file',
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

const fieldChatName = new FieldComponent({
    for: 'display_name',
    label: 'Имя в чате',
    input: new InputComponent({
        name: 'display_name',
        id: 'display_name',
        type: 'text',
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

const buttonSave = new ButtonComponent({
    text: 'Сохранить',
    type: 'submit'
})

const profileForm = new ProfileFormComponent({
    profileHeader: profileHeader,
    profileEditForm: [fieldAvatar, fieldName, fieldSecondName, fieldChatName, fieldLogin, fieldEmail, fieldPhone],
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
                profileForm: profileForm,
            }),
        })
    }

    override render() {
        return `{{{ profileEditPageContent }}}`
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
        alert('Успех!');
    } else {
        validateForm(evt, profileValidationResults);
    }
}
