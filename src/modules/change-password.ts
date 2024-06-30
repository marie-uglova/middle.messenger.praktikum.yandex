import Block from './block';
import { Alert } from '../components/uikit/alert';
import { Input } from '../components/uikit/input';
import { Field } from '../components/uikit/field';
import { Button } from '../components/uikit/button';
import { ProfileHeader } from '../components/profile/profile-header';
import { ChangePasswordPage } from '../pages/change-password-page';

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

class ChangePasswordPageComponent extends Block {
    render() {
        return ChangePasswordPage;
    }
}

const profileHeader = new ProfileHeaderComponent({

});

const fieldOldPassword = new FieldComponent({
    for: 'oldPassword',
    label: 'Старый пароль',
    input: new InputComponent({
        name: 'oldPassword',
        id: 'oldPassword',
        type: 'password',
    })
})

const fieldNewPassword = new FieldComponent({
    for: 'newPassword',
    label: 'Новый пароль',
    input: new InputComponent({
        name: 'newPassword',
        id: 'newPassword',
        type: 'password',
    })
})

const fieldNewPasswordRepeat = new FieldComponent({
    for: 'newPasswordRepeat',
    label: 'Повторите новый пароль',
    input: new InputComponent({
        name: 'newPasswordRepeat',
        id: 'newPasswordRepeat',
        type: 'password',
    })
})

const buttonSave = new ButtonComponent({
    text: 'Сохранить',
    type: 'submit'
})

export class ChangePasswordPageContainer extends Block {
    constructor(props) {
        super({
            ...props,
            changePasswordPageContent: new ChangePasswordPageComponent({
                profileHeader: profileHeader,
                profileChangePasswordForm: [fieldOldPassword, fieldNewPassword, fieldNewPasswordRepeat],
                profileChangePasswordButton: buttonSave
            }),
        })
    }

    override render() {
        return `{{{ changePasswordPageContent }}}`
    }
}
