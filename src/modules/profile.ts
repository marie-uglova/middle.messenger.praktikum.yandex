import Block from '../core/block';
import { Link } from '../components/uikit/link';
import { ProfileHeader } from '../components/profile/profile-header';
import { ProfileRow } from '../components/profile/profile-row';
import { ProfilePage } from '../pages/profile-page';
import User from '../core/get-user';
import AuthController from '../controllers/auth-controller';

const user = new User();

class LinkComponent extends Block {
    render() {
        return Link;
    }
}

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
    userFirstName: '',
    userAvatar: ''
});

const profileRowEmail = new ProfileRowComponent({
    label: 'Почта',
    field: '',
});

const profileRowLogin = new ProfileRowComponent({
    label: 'Логин',
    field: '',
});

const profileRowName = new ProfileRowComponent({
    label: 'Имя',
    field: '',
});

const profileRowSecondName = new ProfileRowComponent({
    label: 'Фамилия',
    field: '',
});

const profileRowChatName = new ProfileRowComponent({
    label: 'Имя в чате',
    field: '',
});

const profileRowPhone = new ProfileRowComponent({
    label: 'Телефон',
    field: '',
});

const linkOut = new LinkComponent({
    text: 'Выйти',
    className: 'red',
    events: {
        click: (evt: Event) => {
            logOut(evt);
        }
    }
})

export class ProfilePageContainer extends Block {
    constructor(props: {[key: string]: string}) {
        super({
            ...props,
            profilePageContent: new ProfilePageComponent({
                profileHeader: profileHeader,
                profileData: [profileRowEmail, profileRowLogin, profileRowName, profileRowSecondName, profileRowChatName, profileRowPhone],
                profileOut: linkOut,
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
            profileRowName.setProps({field: newProps.props.first_name});
            profileRowSecondName.setProps({field: newProps.props.second_name});
            profileRowLogin.setProps({field: newProps.props.login});
            profileRowChatName.setProps({field: newProps.props.display_name});
            profileRowEmail.setProps({field: newProps.props.email});
            profileRowPhone.setProps({field: newProps.props.phone});
            return true;
        }
        return false;
    }

    override render() {
        return `<main class="main">{{{ profilePageContent }}}</main>`
    }
}

function logOut(evt: Event) {
    evt.preventDefault();
    AuthController.logout();
}
