import HTTPTransport from '../core/http';
import BaseAPI from './base-api';

class ProfileApi extends BaseAPI {
    public http = new HTTPTransport();

    public changeProfile(data: string): Promise<any> {
        return this.http.put(`${this.baseUrl}/user/profile`, {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    public changeAvatar(data: FormData): Promise<any> {
        return this.http.put(`${this.baseUrl}/user/profile/avatar`, {
            data,
            headers: {
                'credentials': 'include',
                'mode': 'cors',
            },
        });
    }

    public changePassword(data: string): Promise<any> {
        return this.http.put(`${this.baseUrl}/user/password`, {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}

export default new ProfileApi();
