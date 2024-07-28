import HTTPTransport from './http';
import store from './store';

export default class User {
    http = new HTTPTransport();
    user = {
        first_name: null,
        second_name: null,
        login: null,
        email: null,
    }
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
            .then((data) => {
                store.dispatch(() => {
                    this.mapUserProps(data);
                })
                /*this.user.first_name = data.first_name;
                this.user.second_name = data.second_name;
                this.user.login = data.login;
                this.user.email = data.email;
                console.log(this.user);*/
            })
    }

    mapUserProps(state) {
        return {
            first_name: state.user.first_name,
            second_name: state.user.second_name,
            login: state.user.login,
            email: state.user.email,
        };
    }


}
