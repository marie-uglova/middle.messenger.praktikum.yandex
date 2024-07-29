import Block from './block';
import { ProfileHeader } from '../components/profile/profile-header';
import { ProfileRow } from '../components/profile/profile-row';
import { ProfilePage } from '../pages/profile-page';
import { connect } from './hoc';
import User from './get-user';
import store from "./store";

class ProfileHeaderComponent extends Block {
    render() {
        return ProfileHeader;
    }
}

class ProfileRowComponent extends Block {
    render() {
        return ProfileRow;
    }
}

class ProfilePageComponent extends Block {
    render() {
        return ProfilePage;
    }
}

const profileHeader = new ProfileHeaderComponent({
    userFirstName: ''
});

const profileRowEmail = new ProfileRowComponent({
    label: 'Почта',
    field: 'pochta@yandex.ru',
});

const profileRowLogin = new ProfileRowComponent({
    label: 'Логин',
    field: '',
});

const profileRowName = new ProfileRowComponent({
    label: 'Имя',
    field: 'Иван',
});

const profileRowSecondName = new ProfileRowComponent({
    label: 'Фамилия',
    field: 'Иванов',
});

const profileRowChatName = new ProfileRowComponent({
    label: 'Имя в чате',
    field: 'Иван',
});

const profileRowPhone = new ProfileRowComponent({
    label: 'Телефон',
    field: '+7 (909) 967 30 30',
});

export class ProfilePageContainer extends Block {
    constructor(props: {[key: string]: string}) {
        super({
            ...props,
            profilePageContent: new ProfilePageComponent({
                profileHeader: profileHeader,
                profileData: [profileRowEmail, profileRowLogin, profileRowName, profileRowSecondName, profileRowChatName, profileRowPhone],
            }),
        })
        new User().getUser();
    }

    override componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps.props?.first_name !== newProps.props?.first_name) {
            profileHeader.setProps({userFirstName: newProps.props.first_name});
            profileRowLogin.setProps({field: newProps.props.login});
            return true;
        }
        return false;
    }

    override render() {
        return `{{{ profilePageContent }}}`
    }
}
