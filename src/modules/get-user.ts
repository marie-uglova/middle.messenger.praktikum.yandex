import HTTPTransport from './http';
import store from './store';

export default class User {
    http = new HTTPTransport();
    constructor() {

    }

    getUser() {
        this.http.get('https://ya-praktikum.tech/api/v2/auth/user', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                return JSON.parse(response.response);
            })
            .then((responseData) => {
                console.log(responseData);
                let actionPayload = this.mapUserProps(responseData);
                store.dispatch({
                    type: 'ADD_USER',
                    payload: actionPayload
                })
            })
    }

    mapUserProps(responseData) {
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
