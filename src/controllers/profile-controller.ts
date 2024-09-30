import profileApi from '../services/profile-api';
import Router from '../core/router';

const router = new Router('app');

export class ProfileController {
    public async changeProfile(data: string): Promise<void> {
        try {
            const { status, response } = await profileApi.changeProfile(data);
            if (status === 200) {
                router.go('/profile');
            } else if (status === 500) {
                router.go('/500');
            } else {
                alert(JSON.parse(response).reason);
            }
        } catch (err) {
            console.log(err);
        }
    }
    public async changeAvatar(data: FormData): Promise<void> {
        try {
            const { status, response } = await profileApi.changeAvatar(data);
            if (status === 200) {
                router.go('/profile');
            } else if (status === 500) {
                router.go('/500');
            } else {
                alert(JSON.parse(response).reason);
            }
        } catch (err) {
            console.log(err);
        }
    }
    public async changePassword(data: string): Promise<void> {
        try {
            const { status, response } = await profileApi.changePassword(data);
            if (status === 200) {
                router.go('/profile');
            } else if (status === 500) {
                router.go('/500');
            } else {
                alert(JSON.parse(response).reason);
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export default new ProfileController();
