import HTTPTransport from '../core/http';
import BaseAPI from './base-api';

class AuthApi extends BaseAPI {
    public http = new HTTPTransport();

    public auth(): Promise<any> {
        return this.http.get(`${this.baseUrl}/auth/user`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public singin(data: string): Promise<any> {
        return this.http.post(`${this.baseUrl}/auth/signin`, {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public singup(data: string): Promise<any> {
        return this.http.post(`${this.baseUrl}/auth/signup`, {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public logout(): Promise<any> {
        return this.http.post(`${this.baseUrl}/auth/logout`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}

export default new AuthApi();

