import Router from './router';
import {expect} from 'chai';
import { connect } from './hoc';
import { Error404PageContainer } from '../modules/404';

const error404Page = connect(Error404PageContainer)

const router = new Router('<body></body>');
router
    .use('/404', error404Page)
    .start()

describe('Router', () => {
    it('Обновить историю', () => {
        router.go('/404');
        expect(window.history.length).to.eq(2);
    })
})
