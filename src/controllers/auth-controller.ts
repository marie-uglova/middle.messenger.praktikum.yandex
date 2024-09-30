import authApi from '../services/auth-api';
import Router from '../core/router';

const router = new Router('app');

export class AuthController {
    public async auth(): Promise<void> {
        try {
            const { status, response } = await authApi.auth();
            if (status === 200) {
                return JSON.parse(response);
            } else {
                console.log(JSON.parse(response).reason);
            }
        } catch (err) {
            console.log(err);
        }
    }
    public async signin(data: string): Promise<void> {
        try {
            const { status, response } = await authApi.singin(data);
            if (status === 200) {
                router.go('/messenger');
            } else if (status === 500) {
                router.go('/500');
            } else {
                alert(JSON.parse(response).reason);
            }
        } catch (err) {
            console.log(err);
        }
    }
    public async signup(data: string): Promise<void> {
        try {
            const { status, response } = await authApi.singup(data);
            if (status === 200) {
                router.go('/messenger');
            } else if (status === 500) {
                router.go('/500');
            } else {
                alert(JSON.parse(response).reason);
            }
        } catch (err) {
            console.log(err);
        }
    }
    public async logout(): Promise<void> {
        try {
            const { status, response } = await authApi.logout();
            if (status === 200) {
                router.go('/');
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

export default new AuthController();
