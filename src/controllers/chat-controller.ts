import chatApi from '../services/chat-api';
import Router from '../core/router';

const router = new Router('app');

export class ChatController {
    public async getChats(): Promise<void> {
        try {
            const { status, response } = await chatApi.getChats();
            if (status === 200) {
                return JSON.parse(response);
            } else if (status === 500) {
                router.go('/500');
            } else {
                alert(JSON.parse(response).reason);
            }
        } catch (err) {
            console.log(err);
        }
    }
    public async searchUser(data: string): Promise<void> {
        try {
            const { status, response } = await chatApi.searchUser(data);
            if (status === 200) {
                return JSON.parse(response);
            } else if (status === 500) {
                router.go('/500');
            } else {
                alert(JSON.parse(response).reason);
            }
        } catch (err) {
            console.log(err);
        }
    }
    public async createChat(data: string): Promise<void> {
        try {
            const { status, response } = await chatApi.createChat(data);
            if (status === 200) {
                return JSON.parse(response);
            } else if (status === 500) {
                router.go('/500');
            } else {
                alert(JSON.parse(response).reason);
            }
        } catch (err) {
            console.log(err);
        }
    }
    public async addUser(data: string): Promise<void> {
        try {
            const { status, response } = await chatApi.addUser(data);
            if (status === 200) {
                return response;
            } else if (status === 500) {
                router.go('/500');
            } else {
                alert(JSON.parse(response).reason);
            }
        } catch (err) {
            console.log(err);
        }
    }
    public async getToken(id: number): Promise<void> {
        try {
            const { status, response } = await chatApi.getToken(id);
            if (status === 200) {
                return JSON.parse(response);
            } else if (status === 500) {
                router.go('/500');
            } else {
                alert(JSON.parse(response).reason);
            }
        } catch (err) {
            console.log(err);
        }
    }
    public async deleteUser(data: string): Promise<void> {
        try {
            const { status, response } = await chatApi.deleteUser(data);
            if (status === 200) {
                return JSON.parse(response);
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

export default new ChatController();
