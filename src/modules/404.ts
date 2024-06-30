import Block from './block';
import { Error404Page } from '../pages/error404-page';

class Error404PageComponent extends Block {
    render() {
        return Error404Page;
    }
}

export class Error404PageContainer extends Block {
    constructor(props) {
        super({
            ...props,
            errorPageContent: new Error404PageComponent({
                title: 'Ошибка 404',
                text: 'Такой страницы не существует.',
            }),
        })
    }

    override render() {
        return `{{{ errorPageContent }}}`
    }
}
