import Block from './block';
import { Alert } from '../components/uikit/alert';
import { Input } from '../components/uikit/input';
import { Field } from '../components/uikit/field';
import { Button } from '../components/uikit/button';
import { ProfileHeader } from '../components/profile/profile-header';
import { ProfileEditPage } from '../pages/profile-edit-page';

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

class ProfileHeaderComponent extends Block {
    render() {
        return ProfileHeader;
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
    })
})

const fieldEmail = new FieldComponent({
    for: 'email',
    label: 'Почта',
    input: new InputComponent({
        name: 'email',
        id: 'email',
        type: 'email',
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

const buttonSave = new ButtonComponent({
    text: 'Сохранить',
    type: 'submit'
})

export class ProfileEditPageContainer extends Block {
    constructor(props) {
        super({
            ...props,
            profileEditPageContent: new ProfileEditPageComponent({
                profileHeader: profileHeader,
                profileEditForm: [fieldAvatar, fieldName, fieldSecondName, fieldChatName, fieldLogin, fieldEmail, fieldPhone],
                profileEditButton: buttonSave
            }),
        })
    }

    override render() {
        return `{{{ profileEditPageContent }}}`
    }
}
