import Router from './router';
import Block from './block';
import {expect} from 'chai';

const router = new Router('app');

describe('Router', () => {
    it('Найти роут', () => {
        router.use('/404', Block);
        expect(router.getRoute('/404') !== undefined).to.eq(true);
    })
})
