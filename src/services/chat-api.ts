import HTTPTransport from '../core/http';
import BaseAPI from './base-api';

class ChatApi extends BaseAPI {
    public http = new HTTPTransport();

    public getChats(): Promise<any> {
        return this.http.get(`${this.baseUrl}/chats`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
    public searchUser(data: string): Promise<any> {
        return this.http.post(`${this.baseUrl}/user/search`, {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
    public createChat(data: string): Promise<any> {
        return this.http.post(`${this.baseUrl}/chats`, {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
    public addUser(data: string): Promise<any> {
        return this.http.put(`${this.baseUrl}/chats/users`, {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
    public getToken(id: number): Promise<any> {
        console.log('id', `${this.baseUrl}/chats/token/${id}`)
        return this.http.post(`${this.baseUrl}/chats/token/${id}`, {
            id,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'credentials': 'include',
                'mode': 'cors',
            },
        });
    }
    public deleteUser(data: string): Promise<any> {
        return this.http.delete(`${this.baseUrl}/chats/users`, {
            data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}

export default new ChatApi();
