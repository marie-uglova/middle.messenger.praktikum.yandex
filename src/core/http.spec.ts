import HTTPTransport from './http';
import BaseAPI from '../services/base-api';
import {expect} from 'chai';

const http = new HTTPTransport();
const baseUrl = new BaseAPI();

describe('HTTP', () => {
    it('Выполнить POST-запрос', async () => {
        http.post(`${baseUrl}/auth/logout`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                expect(response).to.be.eq({'reason': 'Cookiess is not valid'});
            })
    })
})
