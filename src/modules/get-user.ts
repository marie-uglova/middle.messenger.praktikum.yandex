import HTTPTransport from './http';
import store from './store';
import Router from './router';

export default class User {
    http = new HTTPTransport();
    router = new Router('app');

    constructor() {}

    async getUser() {
        const response: any = await this.http.get('https://ya-praktikum.tech/api/v2/auth/user', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        return JSON.parse(response.response);
    }

    async getUserStore() {
        const responseData = await this.getUser();
        if (!responseData.reason) {
            let actionPayload = this.mapUserProps(responseData);
            store.dispatch({
                type: 'ADD_USER',
                payload: actionPayload
            });
        }
    }

    async getUserId() {
        const responseData = await this.getUser();
        if (!responseData.reason) {
            return responseData.id;
        }
    }

    mapUserProps(responseData: any) {
        return {
            first_name: responseData.first_name,
            second_name: responseData.second_name,
            login: responseData.login,
            display_name: responseData.display_name,
            email: responseData.email,
            phone: responseData.phone,
            avatar: responseData.avatar,
            id: responseData.id,
        };
    }
}
