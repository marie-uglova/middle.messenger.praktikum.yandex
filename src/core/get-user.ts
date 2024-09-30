import store from './store';
import AuthController from '../controllers/auth-controller';

export default class User {

    constructor() {}

    async getUser() {
        const response: any = AuthController.auth();
        return response;
    }

    async getUserStore() {
        const responseData = await this.getUser();
        if (responseData) {
            let actionPayload = this.mapUserProps(responseData);
            store.dispatch({
                type: 'ADD_USER',
                payload: actionPayload
            });
        }
    }

    async getUserId() {
        const response: any = await this.getUser();
        return response.id;
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
